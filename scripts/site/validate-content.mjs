import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EVIDENCE = path.join(ROOT, "assets/data/evidence.json");

const FORBIDDEN_PATTERNS = [
  /성적\s*지향/i,
  /sexual\s+orientation/i,
  /sexual\s+preference/i,
];

const ENUMS = {
  programs: new Set([
    "wide-field-eye-modeling",
    "visual-neuroperformance",
    "adaptive-optical-systems",
    "longitudinal-eye-intelligence",
  ]),
  contributions: new Set(["measure", "model", "augment", "learn"]),
  artifactKind: new Set([
    "peer_reviewed",
    "conference",
    "investigator_study",
    "prototype",
    "simulation",
    "software_artifact",
    "engineering_spec",
    "bench_validation",
    "dataset",
  ]),
  status: new Set([
    "verified",
    "internally_validated",
    "exploratory",
    "hypothesis",
    "archived",
  ]),
  verification: new Set([
    "verified_doi",
    "verified_kci",
    "verified_repository",
    "conference_abstract_no_doi",
    "source_on_file_not_public",
    "unverifiable",
  ]),
  publicability: new Set(["public", "teaser_only", "approval_required", "confidential"]),
};

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function fail(errors, message) {
  errors.push(message);
}

function validateEnumArray(errors, values, allowed, label, studyId) {
  if (!Array.isArray(values)) {
    fail(errors, `${studyId}: ${label} must be an array`);
    return;
  }
  for (const value of values) {
    if (!allowed.has(value)) {
      fail(errors, `${studyId}: invalid ${label} "${value}"`);
    }
  }
}

function validate() {
  const evidence = readJson(EVIDENCE);
  const errors = [];
  const serialized = JSON.stringify(evidence);

  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(serialized)) {
      fail(errors, `forbidden sensitive or blocked token matched: ${pattern}`);
    }
  }

  if (evidence.schema_version !== "1.0") {
    fail(errors, "schema_version must be 1.0");
  }
  if (!Array.isArray(evidence.studies)) {
    fail(errors, "studies must be an array");
  }
  if (!Array.isArray(evidence.engineering_evidence)) {
    fail(errors, "engineering_evidence must be an array");
  }

  const studies = evidence.studies || [];
  const studyIds = new Set();
  const artifactIds = new Set();
  const duplicateStudy = studies.find((study) => study.study_id === "STUDY-GYEONGNAM-VISUAL-LIFE-2022");

  if (evidence.counts?.legacy_artifact_records !== 59) {
    fail(errors, "legacy_artifact_records must be 59");
  }
  if (evidence.counts?.sensitive_artifacts_excluded !== 1) {
    fail(errors, "sensitive_artifacts_excluded must be 1");
  }
  if (evidence.counts?.public_artifact_records !== 58) {
    fail(errors, "public_artifact_records must be 58");
  }
  if (evidence.counts?.migrated_public_study_groups !== 57 || studies.length !== 57) {
    fail(errors, "migrated_public_study_groups and studies.length must be 57");
  }

  for (const study of studies) {
    if (!study.study_id || studyIds.has(study.study_id)) {
      fail(errors, `duplicate or missing study_id: ${study.study_id}`);
    }
    studyIds.add(study.study_id);
    if (!Array.isArray(study.legacy_record_ids) || study.legacy_record_ids.length < 1) {
      fail(errors, `${study.study_id}: legacy_record_ids required`);
    }
    if (!study.title?.ko || !study.title?.en) {
      fail(errors, `${study.study_id}: KO/EN title required`);
    }
    if (!Number.isInteger(study.year)) {
      fail(errors, `${study.study_id}: year must be an integer`);
    }
    validateEnumArray(errors, study.programs, ENUMS.programs, "programs", study.study_id);
    validateEnumArray(errors, study.contributions, ENUMS.contributions, "contributions", study.study_id);
    if (study.status !== null && !ENUMS.status.has(study.status)) {
      fail(errors, `${study.study_id}: invalid status "${study.status}"`);
    }
    if (!ENUMS.publicability.has(study.publicability)) {
      fail(errors, `${study.study_id}: invalid publicability "${study.publicability}"`);
    }
    if (!Array.isArray(study.artifacts) || study.artifacts.length < 1) {
      fail(errors, `${study.study_id}: artifacts required`);
    }
    for (const artifact of study.artifacts || []) {
      if (!artifact.artifact_id || artifactIds.has(artifact.artifact_id)) {
        fail(errors, `${study.study_id}: duplicate or missing artifact_id ${artifact.artifact_id}`);
      }
      artifactIds.add(artifact.artifact_id);
      if (artifact.kind !== null && !ENUMS.artifactKind.has(artifact.kind)) {
        fail(errors, `${artifact.artifact_id}: invalid artifact kind "${artifact.kind}"`);
      }
      if (!ENUMS.verification.has(artifact.verification)) {
        fail(errors, `${artifact.artifact_id}: invalid verification "${artifact.verification}"`);
      }
      if (artifact.kind === "peer_reviewed" && !["verified_doi", "verified_kci"].includes(artifact.verification)) {
        fail(errors, `${artifact.artifact_id}: peer_reviewed requires DOI or KCI verification`);
      }
    }
  }

  if (!duplicateStudy) {
    fail(errors, "missing grouped duplicate study STUDY-GYEONGNAM-VISUAL-LIFE-2022");
  } else {
    const ids = duplicateStudy.legacy_record_ids.slice().sort().join(",");
    if (ids !== "LEGACY-001,LEGACY-036") {
      fail(errors, `duplicate study must contain LEGACY-001 and LEGACY-036, got ${ids}`);
    }
    if (duplicateStudy.artifacts.length !== 2) {
      fail(errors, "duplicate study must preserve two artifacts");
    }
  }

  if (artifactIds.size !== 58) {
    fail(errors, `artifact count must be 58, got ${artifactIds.size}`);
  }

  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  console.log(`Validated ${studies.length} studies and ${artifactIds.size} artifacts.`);
}

validate();
