// ===== CHARTS JAVASCRIPT FOR VISUAL REHABILITATION RESEARCH WEBSITE =====

document.addEventListener('DOMContentLoaded', function() {
    // Check if Chart.js is available, if not, create simple charts
    if (typeof Chart !== 'undefined') {
        initializeChartJS();
    } else {
        initializeSimpleCharts();
        loadChartJSAndInit();
    }
});

// === CHART.JS IMPLEMENTATION ===
function initializeChartJS() {
    // Set global Chart.js defaults
    Chart.defaults.font.family = "'Noto Sans KR', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#6b7280';
    
    initializeSuccessRateChart();
    initializeImprovementChart();
    initializeSatisfactionChart();
    initializeComparisonChart();
}

function initializeSuccessRateChart() {
    const ctx = document.getElementById('successRateChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['성공', '실패'],
            datasets: [{
                data: [95.2, 4.8],
                backgroundColor: [
                    '#059669',
                    '#e5e7eb'
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        },
        plugins: [{
            id: 'centerText',
            beforeDraw: function(chart) {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;
                
                ctx.restore();
                const fontSize = (height / 114).toFixed(2);
                ctx.font = `bold ${fontSize}em 'Noto Sans KR'`;
                ctx.fillStyle = '#2563eb';
                ctx.textBaseline = 'middle';
                
                const text = '95.2%';
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2;
                
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}

function initializeImprovementChart() {
    const ctx = document.getElementById('improvementChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['시력', '대비감도', '시야범위', '추적정확도'],
            datasets: [{
                label: '개선율 (%)',
                data: [62.2, 52.4, 59.8, 34.8],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(5, 150, 105, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderColor: [
                    '#2563eb',
                    '#059669',
                    '#f59e0b',
                    '#8b5cf6'
                ],
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 70,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                delay: (context) => {
                    return context.dataIndex * 200;
                },
                duration: 1000
            }
        }
    });
}

function initializeSatisfactionChart() {
    const ctx = document.getElementById('satisfactionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['치료효과', '편의성', '안전성', '비용', '지속성'],
            datasets: [{
                label: '만족도',
                data: [95, 88, 97, 85, 91],
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: '#2563eb',
                borderWidth: 2,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            animation: {
                duration: 2000
            }
        }
    });
}

function initializeComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['치료 전', '1개월', '3개월', '6개월'],
            datasets: [{
                label: '시력 개선',
                data: [0.82, 0.65, 0.45, 0.31],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }, {
                label: '대비감도',
                data: [1.24, 1.35, 1.62, 1.89],
                borderColor: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#059669',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// === SIMPLE CHARTS (FALLBACK) ===
function initializeSimpleCharts() {
    createSimpleDonutChart('successRateChart', 95.2, '#059669');
    createSimpleBarChart('improvementChart', [62.2, 52.4, 59.8, 34.8]);
    createSimpleRadarChart('satisfactionChart', [95, 88, 97, 85, 91]);
}

function createSimpleDonutChart(canvasId, percentage, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 15;
    ctx.stroke();
    
    // Progress arc
    const angle = (percentage / 100) * 2 * Math.PI - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Center text
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 24px "Noto Sans KR"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(percentage + '%', centerX, centerY);
}

function createSimpleBarChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const barWidth = chartWidth / data.length - 20;
    const maxValue = Math.max(...data);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * (barWidth + 20) + 10;
        const y = canvas.height - padding - barHeight;
        
        // Bar
        ctx.fillStyle = ['#2563eb', '#059669', '#f59e0b', '#8b5cf6'][index];
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Value label
        ctx.fillStyle = '#374151';
        ctx.font = '12px "Noto Sans KR"';
        ctx.textAlign = 'center';
        ctx.fillText(value + '%', x + barWidth / 2, y - 5);
    });
}

function createSimpleRadarChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    const labels = ['치료효과', '편의성', '안전성', '비용', '지속성'];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        const gridRadius = (radius / 5) * i;
        ctx.arc(centerX, centerY, gridRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Draw data polygon
    ctx.beginPath();
    data.forEach((value, index) => {
        const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2;
        const distance = (value / 100) * radius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(37, 99, 235, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw data points
    data.forEach((value, index) => {
        const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2;
        const distance = (value / 100) * radius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#2563eb';
        ctx.fill();
    });
}

// === ANIMATED STATISTICS ===
function initializeAnimatedStats() {
    const statElements = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatistic(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statElements.forEach(element => {
        observer.observe(element);
    });
}

function animateStatistic(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const suffix = element.textContent.replace(/[\d\s]/g, '');
    
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateStat() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateStat);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    updateStat();
}

// === INTERACTIVE DATA TOOLTIPS ===
function initializeDataTooltips() {
    const dataPoints = document.querySelectorAll('.data-point');
    
    dataPoints.forEach(point => {
        point.addEventListener('mouseenter', function(e) {
            showTooltip(e, this.dataset.value, this.dataset.label);
        });
        
        point.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event, value, label) {
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-label">${label}</div>
        <div class="tooltip-value">${value}</div>
    `;
    tooltip.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(tooltip);
    
    const updateTooltipPosition = (e) => {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY - 10 + 'px';
    };
    
    updateTooltipPosition(event);
    document.addEventListener('mousemove', updateTooltipPosition);
    
    tooltip.updatePosition = updateTooltipPosition;
}

function hideTooltip() {
    const tooltip = document.querySelector('.chart-tooltip');
    if (tooltip) {
        document.removeEventListener('mousemove', tooltip.updatePosition);
        tooltip.remove();
    }
}

// === DYNAMIC CHART UPDATES ===
function updateChartData(chartId, newData) {
    // This function can be used to dynamically update chart data
    // Useful for real-time data updates or user interactions
    console.log(`Updating chart ${chartId} with new data:`, newData);
}

// === CHART.JS LAZY LOADING ===
function loadChartJSAndInit() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function() {
        initializeChartJS();
    };
    script.onerror = function() {
        console.log('Failed to load Chart.js, using simple charts');
    };
    document.head.appendChild(script);
}

// === EXPORT FUNCTIONALITY ===
function exportChartAsPNG(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = filename || 'chart.png';
    link.href = canvas.toDataURL();
    link.click();
}

function exportChartData(chartData, filename) {
    const csvContent = "data:text/csv;charset=utf-8," 
        + chartData.map(row => row.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename || "chart-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// === PERFORMANCE MONITORING ===
function measureChartPerformance(chartName, startTime) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Chart ${chartName} rendered in ${duration.toFixed(2)}ms`);
}

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const startTime = performance.now();
    
    // Initialize all chart functions
    setTimeout(() => {
        initializeAnimatedStats();
        initializeDataTooltips();
        measureChartPerformance('all', startTime);
    }, 500);
});

// === RESPONSIVE CHART HANDLING ===
window.addEventListener('resize', debounce(() => {
    // Trigger chart resize if Chart.js is available
    if (typeof Chart !== 'undefined') {
        Chart.instances.forEach(chart => {
            chart.resize();
        });
    } else {
        // Re-render simple charts
        initializeSimpleCharts();
    }
}, 250));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}