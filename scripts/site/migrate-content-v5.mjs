import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "assets/data/content_v5.json");
const OUT_DIR = path.join(ROOT, "assets/data");
const REPORT_DIR = path.join(ROOT, "docs/reports");

const SENSITIVE_LEGACY_ID = 24;
const DUPLICATE_STUDY_LEGACY_IDS = new Set([1, 36]);

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function pad3(value) {
  return String(value).padStart(3, "0");
}

function slugify(text, fallback) {
  const ascii = text
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return ascii || fallback;
}

function legacyIdFromCurrentIndex(currentIndexZeroBased) {
  const currentId = currentIndexZeroBased + 1;
  return currentId >= SENSITIVE_LEGACY_ID ? currentId + 1 : currentId;
}

function splitAuthors(raw) {
  if (!raw) return [];
  return raw.split(",").map((name, index) => ({
    display_name: name.trim(),
    order: index + 1,
  })).filter((author) => author.display_name);
}

function normalizeUrl(raw) {
  const value = String(raw || "").trim();
  return value ? value : null;
}

function verificationFromUrl(url) {
  if (!url) return "source_on_file_not_public";
  if (url.includes("doi.org")) return "verified_doi";
  if (url.includes("kci.go.kr")) return "verified_kci";
  return "unverifiable";
}

function createArtifact(record, langRecord, legacyId) {
  const url = normalizeUrl(record.doi);
  return {
    artifact_id: `ART-LEGACY-${pad3(legacyId)}`,
    legacy_record_id: `LEGACY-${pad3(legacyId)}`,
    kind: null,
    legacy_field: {
      ko: langRecord.ko?.field || null,
      en: langRecord.en?.field || null,
    },
    citation: {
      ko: langRecord.ko?.journal || null,
      en: langRecord.en?.journal || null,
    },
    verification: verificationFromUrl(url),
    doi: url && url.includes("doi.org") ? url : null,
    url,
  };
}

function makeStudy(recordPair, currentIndexZeroBased) {
  const legacyId = legacyIdFromCurrentIndex(currentIndexZeroBased);
  const ko = recordPair.ko;
  const en = recordPair.en;
  const grouped = DUPLICATE_STUDY_LEGACY_IDS.has(legacyId);
  const studyId = grouped
    ? "STUDY-GYEONGNAM-VISUAL-LIFE-2022"
    : `STUDY-LEGACY-${pad3(legacyId)}`;
  const titleBasis = en?.title || ko?.title || studyId;

  return {
    study_id: studyId,
    legacy_record_ids: [`LEGACY-${pad3(legacyId)}`],
    slug: grouped
      ? "gyeongnam-visual-life-status"
      : slugify(titleBasis, `legacy-${pad3(legacyId)}`),
    title: {
      ko: ko?.title || null,
      en: en?.title || null,
    },
    summary: {
      ko: ko?.abstract || null,
      en: en?.abstract || null,
      review_state: "pending_source_review",
    },
    year: Number(ko?.year || en?.year) || null,
    authors: splitAuthors(ko?.authors || en?.authors),
    programs: [],
    contributions: [],
    status: null,
    publicability: "public",
    question: { ko: null, en: null },
    sample: {
      n: null,
      population: { ko: null, en: null },
    },
    method: { ko: null, en: null },
    result: {
      ko: null,
      en: null,
      effect_size: null,
      uncertainty: null,
    },
    limitations: { ko: null, en: null },
    artifacts: [createArtifact(ko || en, recordPair, legacyId)],
    materials: [],
    asset_ids: [],
    claim_ids: [],
    last_reviewed: null,
  };
}

function mergeStudy(target, source) {
  for (const legacyId of source.legacy_record_ids) {
    if (!target.legacy_record_ids.includes(legacyId)) {
      target.legacy_record_ids.push(legacyId);
    }
  }
  target.artifacts.push(...source.artifacts);
  target.legacy_record_ids.sort();
  target.artifacts.sort((a, b) => a.legacy_record_id.localeCompare(b.legacy_record_id));
}

function main() {
  const content = readJson(INPUT);
  const koPublications = content.ko?.publications || [];
  const enPublications = content.en?.publications || [];
  if (koPublications.length !== enPublications.length) {
    throw new Error(`KO/EN publication count mismatch: ${koPublications.length}/${enPublications.length}`);
  }

  const studiesById = new Map();
  const report = {
    generated_at: new Date().toISOString(),
    input: "assets/data/content_v5.json",
    legacy_artifact_records: 59,
    sensitive_artifacts_excluded: 1,
    public_artifact_records: koPublications.length,
    migrated_public_study_groups: 0,
    same_study_grouping: {
      study_id: "STUDY-GYEONGNAM-VISUAL-LIFE-2022",
      legacy_record_ids: ["LEGACY-001", "LEGACY-036"],
    },
    mapped: 0,
    missing_translation: 0,
    missing_link: 0,
    pending_classification: 0,
  };

  koPublications.forEach((ko, index) => {
    const en = enPublications[index] || null;
    const study = makeStudy({ ko, en }, index);
    if (!en?.title) report.missing_translation += 1;
    if (!normalizeUrl(ko?.doi || en?.doi)) report.missing_link += 1;
    if (study.programs.length === 0 || study.contributions.length === 0 || study.status === null) {
      report.pending_classification += 1;
    }
    if (studiesById.has(study.study_id)) {
      mergeStudy(studiesById.get(study.study_id), study);
    } else {
      studiesById.set(study.study_id, study);
    }
    report.mapped += 1;
  });

  const studies = Array.from(studiesById.values())
    .sort((a, b) => (b.year || 0) - (a.year || 0) || a.study_id.localeCompare(b.study_id));
  report.migrated_public_study_groups = studies.length;

  const evidence = {
    schema_version: "1.0",
    generated_from: "assets/data/content_v5.json",
    generated_at: report.generated_at,
    counts: {
      legacy_artifact_records: 59,
      sensitive_artifacts_excluded: 1,
      public_artifact_records: koPublications.length,
      migrated_public_study_groups: studies.length,
      engineering_evidence: 0,
      total_evidence_cards: studies.length,
    },
    studies,
    engineering_evidence: [],
  };

  writeJson(path.join(OUT_DIR, "evidence.json"), evidence);
  writeJson(path.join(REPORT_DIR, "evidence-migration-report.json"), report);
  console.log(`Mapped ${report.mapped} public artifacts into ${studies.length} study groups.`);
  console.log(`Missing public links: ${report.missing_link}`);
  console.log(`Pending classification: ${report.pending_classification}`);
}

main();
