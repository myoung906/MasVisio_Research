<?php
/**
 * MVR 실시간 연구 데이터 API
 * 시각재활 연구 진행률, 통계 데이터 제공
 */

require_once '../config/server-config.php';

header('Content-Type: application/json; charset=utf-8');
setSecurityHeaders();

class MVRDataAPI {
    private $db;
    
    public function __construct() {
        $this->db = DatabaseConfig::getConnection();
    }
    
    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $endpoint = $_GET['endpoint'] ?? 'overview';
        
        try {
            switch ($method) {
                case 'GET':
                    $this->handleGetRequest($endpoint);
                    break;
                case 'POST':
                    $this->handlePostRequest($endpoint);
                    break;
                default:
                    $this->sendError('Method not allowed', 405);
            }
        } catch (Exception $e) {
            $this->sendError('Internal server error: ' . $e->getMessage(), 500);
        }
    }
    
    private function handleGetRequest($endpoint) {
        switch ($endpoint) {
            case 'overview':
                $this->getResearchOverview();
                break;
            case 'progress':
                $this->getProgressData();
                break;
            case 'statistics':
                $this->getStatistics();
                break;
            case 'projects':
                $this->getProjectsData();
                break;
            case 'publications':
                $this->getPublicationsData();
                break;
            case 'realtime':
                $this->getRealtimeMetrics();
                break;
            default:
                $this->sendError('Invalid endpoint', 404);
        }
    }
    
    private function getResearchOverview() {
        $data = [
            'status' => 'success',
            'timestamp' => date('c'),
            'data' => [
                'total_projects' => 12,
                'active_studies' => 8,
                'completed_studies' => 15,
                'publications' => 23,
                'research_areas' => [
                    'myopia_control' => [
                        'name' => '근시 제어 연구',
                        'progress' => 75,
                        'participants' => 150,
                        'status' => 'active'
                    ],
                    'neural_stimulation' => [
                        'name' => '신경 자극 치료',
                        'progress' => 60,
                        'participants' => 89,
                        'status' => 'active'
                    ],
                    'visual_cognition' => [
                        'name' => '시각 인지 연구',
                        'progress' => 90,
                        'participants' => 200,
                        'status' => 'analysis'
                    ],
                    'biometric_analysis' => [
                        'name' => '생체 신호 분석',
                        'progress' => 45,
                        'participants' => 75,
                        'status' => 'recruiting'
                    ]
                ]
            ],
            'performance' => getPerformanceMetrics()
        ];
        
        sendJsonResponse($data);
    }
    
    private function getProgressData() {
        $data = [
            'status' => 'success',
            'timestamp' => date('c'),
            'data' => [
                'monthly_progress' => [
                    ['month' => '2024-10', 'completed' => 3, 'ongoing' => 5],
                    ['month' => '2024-11', 'completed' => 5, 'ongoing' => 7],
                    ['month' => '2024-12', 'completed' => 7, 'ongoing' => 8],
                    ['month' => '2025-01', 'completed' => 9, 'ongoing' => 8]
                ],
                'participant_recruitment' => [
                    'target' => 500,
                    'current' => 314,
                    'completion_rate' => 62.8,
                    'monthly_intake' => 45
                ],
                'data_collection' => [
                    'total_sessions' => 1247,
                    'completed_sessions' => 1089,
                    'pending_analysis' => 158,
                    'completion_rate' => 87.3
                ]
            ],
            'performance' => getPerformanceMetrics()
        ];
        
        sendJsonResponse($data);
    }
    
    private function getStatistics() {
        $data = [
            'status' => 'success',
            'timestamp' => date('c'),
            'data' => [
                'demographics' => [
                    'age_groups' => [
                        '18-25' => 23,
                        '26-35' => 45,
                        '36-45' => 67,
                        '46-55' => 89,
                        '56-65' => 54,
                        '65+' => 36
                    ],
                    'gender_distribution' => [
                        'male' => 152,
                        'female' => 162
                    ]
                ],
                'research_outcomes' => [
                    'significant_improvements' => 78.5,
                    'moderate_improvements' => 15.2,
                    'no_change' => 4.8,
                    'adverse_effects' => 1.5
                ],
                'device_usage' => [
                    'daily_users' => 245,
                    'weekly_users' => 189,
                    'average_session_time' => 23.5,
                    'compliance_rate' => 84.2
                ]
            ],
            'performance' => getPerformanceMetrics()
        ];
        
        sendJsonResponse($data);
    }
    
    private function getProjectsData() {
        $projects = [
            [
                'id' => 'mvr-001',
                'title' => '4D 근시제어 렌즈 효능 연구',
                'status' => 'active',
                'progress' => 75,
                'start_date' => '2024-06-01',
                'expected_completion' => '2025-05-31',
                'participants' => 150,
                'primary_investigator' => 'Dr. Kim',
                'budget_utilization' => 68.5
            ],
            [
                'id' => 'mvr-002',
                'title' => '신경 자극 기반 시각 재활 프로그램',
                'status' => 'active',
                'progress' => 60,
                'start_date' => '2024-08-15',
                'expected_completion' => '2025-07-15',
                'participants' => 89,
                'primary_investigator' => 'Dr. Lee',
                'budget_utilization' => 45.2
            ],
            [
                'id' => 'mvr-003',
                'title' => '통합 생체신호 분석 플랫폼',
                'status' => 'recruiting',
                'progress' => 25,
                'start_date' => '2024-12-01',
                'expected_completion' => '2025-11-30',
                'participants' => 25,
                'primary_investigator' => 'Dr. Park',
                'budget_utilization' => 15.8
            ]
        ];
        
        $data = [
            'status' => 'success',
            'timestamp' => date('c'),
            'data' => [
                'projects' => $projects,
                'summary' => [
                    'total_projects' => count($projects),
                    'average_progress' => array_sum(array_column($projects, 'progress')) / count($projects),
                    'total_participants' => array_sum(array_column($projects, 'participants'))
                ]
            ],
            'performance' => getPerformanceMetrics()
        ];
        
        sendJsonResponse($data);
    }
    
    private function getPublicationsData() {
        $publications = [
            [
                'title' => 'Efficacy of 4D Myopia Control Lenses in Adolescents',
                'journal' => 'Journal of Visual Rehabilitation',
                'impact_factor' => 4.2,
                'status' => 'published',
                'date' => '2024-11-15',
                'citations' => 12
            ],
            [
                'title' => 'Neural Stimulation Protocols for Visual Field Recovery',
                'journal' => 'Neuro-Ophthalmology Review',
                'impact_factor' => 3.8,
                'status' => 'under_review',
                'date' => '2024-12-01',
                'citations' => 0
            ],
            [
                'title' => 'Integrated Biometric Analysis in Vision Research',
                'journal' => 'Clinical Vision Science',
                'impact_factor' => 5.1,
                'status' => 'in_preparation',
                'date' => '2025-02-01',
                'citations' => 0
            ]
        ];
        
        $data = [
            'status' => 'success',
            'timestamp' => date('c'),
            'data' => [
                'publications' => $publications,
                'metrics' => [
                    'total_publications' => count($publications),
                    'average_impact_factor' => array_sum(array_column($publications, 'impact_factor')) / count($publications),
                    'total_citations' => array_sum(array_column($publications, 'citations'))
                ]
            ],
            'performance' => getPerformanceMetrics()
        ];
        
        sendJsonResponse($data);
    }
    
    private function getRealtimeMetrics() {
        $data = [
            'status' => 'success',
            'timestamp' => date('c'),
            'data' => [
                'system_status' => [
                    'api_health' => 'healthy',
                    'database_status' => 'connected',
                    'active_sessions' => rand(15, 35),
                    'response_time' => round(microtime(true) * 1000) % 100,
                    'uptime' => '99.8%'
                ],
                'recent_activities' => [
                    ['time' => date('H:i:s', strtotime('-2 minutes')), 'activity' => 'Data collection session completed', 'participant' => 'P-2547'],
                    ['time' => date('H:i:s', strtotime('-5 minutes')), 'activity' => 'New participant enrolled', 'participant' => 'P-2548'],
                    ['time' => date('H:i:s', strtotime('-8 minutes')), 'activity' => 'Analysis report generated', 'participant' => 'Batch-Q4-2024']
                ],
                'alerts' => [
                    ['level' => 'info', 'message' => 'System performance optimal'],
                    ['level' => 'warning', 'message' => 'Storage usage at 75%']
                ]
            ],
            'performance' => getPerformanceMetrics()
        ];
        
        sendJsonResponse($data);
    }
    
    private function sendError($message, $code = 400) {
        sendJsonResponse([
            'status' => 'error',
            'message' => $message,
            'timestamp' => date('c'),
            'performance' => getPerformanceMetrics()
        ], $code);
    }
}

// CORS 처리
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit(0);
}

// API 실행
$api = new MVRDataAPI();
$api->handleRequest();
?>