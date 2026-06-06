// 全局變數
let myMap;
let canvas;
let tripDataLoaded = false;
let selectedDay = 0; // 預設選擇第一天
const mapZoomDefault = 8;
let markers = [];
let routeLines = [];
let shouldFitBounds = true; // 控制是否應該自動縮放地圖
let mapInitialized = false; // 追蹤地圖是否已完全初始化

// 設定Mappa
const options = {
  lat: 46.8182,
  lng: 8.2275,
  zoom: mapZoomDefault,
  style: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

// 設定畫布和地圖
function setup() {
  canvas = createCanvas(windowWidth, windowHeight * 0.7);
  canvas.parent("map-container");

  // 創建Mappa地圖
  const mappa = new Mappa("Leaflet");
  myMap = mappa.tileMap(options);

  // 使用回調確保地圖完全加載
  myMap.overlay(canvas, function () {
    mapInitialized = true;
    console.log("Map initialization complete");

    if (myMap && myMap.map) {
      // 監聽地圖的移動事件，當用戶手動移動地圖時，禁用自動縮放
      myMap.map.on("movestart", function (e) {
        if (e.originalEvent) {
          shouldFitBounds = false;
        }
      });

      // 初始繪製
      drawRoutes();
      drawLocations();
    }
  });

  // 初始化時間線
  setupTimeline();

  // 設定初始日顯示
  showDayDetails(selectedDay);

  // 加載FontAwesome (可選)
  loadFontAwesome();
  // 初始化導覽功能
  setupTourGuide();
  // 初始化重要備忘錄
  setupImportantNotes();
  // 標記地圖初始化完成
  tripDataLoaded = true;

  // 添加鍵盤事件監聽器以提高可訪問性
  const detailsDiv = document.getElementById('daily-details');
  detailsDiv.addEventListener('keydown', function(event) {
    if (event.target.classList.contains('activity-card') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      const index = parseInt(event.target.dataset.index, 10);
      showActivityDetails(index);
    }
  });

  // 停止連續繪製
  noLoop();
}

// 繪製地圖元素
function draw() {
  // 無需連續繪製
}

// 初始化重要備忘錄
function setupImportantNotes() {
  const notesDiv = document.getElementById("important-notes");
  if (!notesDiv) return;

  let html = `<h3>重要備忘錄</h3><ul>`;
  tripData.importantNotes.forEach((note) => {
    html += `<li>${note}</li>`;
  });
  html += `</ul>`;

  notesDiv.innerHTML = html;
}

// 加載FontAwesome
function loadFontAwesome() {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
  document.head.appendChild(link);
}

// 將地圖縮放到包含所有路線的區域
function fitMapToRoutes(routes) {
  if (!myMap || !myMap.map || !routes || routes.length === 0) return;

  try {
    const allPoints = [];
    routes.forEach((route) => {
      route.path.forEach((point) => {
        allPoints.push(L.latLng(point[0], point[1]));
      });
    });

    if (allPoints.length > 0) {
      myMap.map.fitBounds(L.latLngBounds(allPoints), {
        padding: [50, 50],
      });
    }
  } catch (error) {
    console.error("縮放地圖時發生錯誤:", error);
  }
}

// 繪製路線
function drawRoutes() {
  if (!myMap || !myMap.map || !mapInitialized) return;

  try {
    // 清除現有路線
    routeLines.forEach((line) => {
      if (myMap && myMap.map && line) {
        try {
          myMap.map.removeLayer(line);
        } catch (e) {
          console.warn("移除路線時出錯:", e);
        }
      }
    });
    routeLines = [];

    // 只繪製選中日期對應的路線
    const currentDay = tripData.days[selectedDay];
    const dayRoutes = routes.filter(
      (route) =>
        route.name.startsWith(`Day ${currentDay.day}:`) ||
        route.name.startsWith(`Day ${currentDay.day} `)
    );

    if (dayRoutes.length > 0) {
      // 繪製當天路線
      dayRoutes.forEach((route) => {
        try {
          if (
            !route.path ||
            !Array.isArray(route.path) ||
            route.path.length < 2
          ) {
            console.warn(`路線 ${route.name} 的路徑數據無效`);
            return;
          }

          const pointList = route.path.map((point) => {
            return new L.LatLng(point[0], point[1]);
          });

          const polyline = new L.Polyline(pointList, {
            color: route.color || "#3366CC",
            weight: 3,
            opacity: 0.9,
            smoothFactor: 1,
          });

          polyline.addTo(myMap.map);
          polyline.bindPopup(route.name);
          routeLines.push(polyline);
        } catch (routeError) {
          console.error(`繪製路線 ${route.name} 時發生錯誤:`, routeError);
        }
      });

      // 僅在首次加載或用戶明確請求時縮放地圖
      if (shouldFitBounds) {
        fitMapToRoutes(dayRoutes);
        shouldFitBounds = false; // 重置標記
      }
    } else {
      // 如果沒有找到對應路線，且需要縮放視野時
      if (shouldFitBounds) {
        zoomToActivities(tripData.days[selectedDay]);
        shouldFitBounds = false; // 重置標記
      }
    }
  } catch (error) {
    console.error("繪製路線時發生錯誤:", error);
  }
}

function zoomToActivities(day) {
  if (!myMap || !myMap.map || !mapInitialized) return;

  try {
    // 收集當天所有活動的地點坐標
    const locations = [];
    day.activities.forEach((activity) => {
      activity.locations.forEach((loc) => {
        locations.push([loc.lat, loc.lng]);
      });
    });

    if (locations.length > 0) {
      // 如果有多個地點，創建邊界框將所有地點包含在內
      if (locations.length > 1) {
        const bounds = L.latLngBounds(
          locations.map((loc) => L.latLng(loc[0], loc[1]))
        );
        myMap.map.fitBounds(bounds, {
          padding: [50, 50],
        })
      } else {
        // 如果只有一個地點，直接縮放到該地點
        myMap.map.setView([locations[0][0], locations[0][1]], 14);
      }
    }
  } catch (error) {
    console.error("縮放到活動位置時發生錯誤:", error);
  }
}

// 繪製地點標記
function drawLocations() {
  // 清除現有標記
  markers.forEach((marker) => {
    myMap.map.removeLayer(marker);
  });
  markers = [];

  // 添加當日行程點，按時間順序顯示數字標籤
  const day = tripData.days[selectedDay];
  let activityCounter = 1;

  day.activities.forEach((activity) => {
    activity.locations.forEach((location) => {
      // 根據活動類型設定不同圖標和顏色
      let color = getActivityColor(activity.type);

      const marker = L.marker([location.lat, location.lng], {
        icon: L.divIcon({
          className: "activity-marker",
          html: `<div style="display:flex; align-items:center; justify-content:center; background-color:${color}; color:white; width:36px; height:36px; border-radius:50%; font-size:16px; font-weight:bold; box-shadow:0 2px 5px rgba(0,0,0,0.2);">${activityCounter}</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        }),
      }).addTo(myMap.map);

      // 豐富的彈出信息窗口，包含 Google Maps 連結
      marker.bindPopup(
        `
                <div style="min-width:250px;">
                    <h3 style="margin:0 0 8px 0; color:${color}; border-bottom:2px solid ${color};">${location.name}</h3>
                    <p style="margin:5px 0;"><i class="fas fa-clock"></i> <strong>${activity.time}</strong></p>
                    <p style="margin:5px 0;">${activity.description}</p>
                    ${activity.type === "transport" ? `<p style="margin:5px 0; font-size:12px; color:#666;"><i class="fas fa-info-circle"></i> ${getTransportDetails(day.day, activity.description)}</p>` : ""}
                    ${activity.type === "sightseeing" ? `<p style="margin:5px 0; font-size:12px; color:#666;"><i class="fas fa-info-circle"></i> ${getSightseeingDetails(day.day, activity.description)}</p>` : ""}
                    <p style="margin:5px 0;"><a href="https://www.google.com/maps/search/${location.lat},${location.lng}" target="_blank">View on Google Maps</a></p>
                </div>
            `,
        {
          maxWidth: 300,
        }
      );

      markers.push(marker);
      activityCounter++;
    });
  });

  // 繪製連接線，顯示當天的行程順序
  drawDayPath(day);
}

// 添加顯示每日行程路徑的函數
function drawDayPath(day) {
  if (!myMap || !myMap.map || !mapInitialized) return;

  try {
    // 收集當天所有活動點
    let pathPoints = [];
    day.activities.forEach((activity) => {
      activity.locations.forEach((loc) => {
        pathPoints.push([loc.lat, loc.lng]);
      });
    });

    if (pathPoints.length > 1) {
      const dayPath = L.polyline(pathPoints, {
        color: "#2980b9",
        weight: 3,
        opacity: 0.7,
        dashArray: "5, 10",
        lineJoin: "round",
      }).addTo(myMap.map);
      markers.push(dayPath);
    }
  } catch (error) {
    console.error("繪製日行程路徑時發生錯誤:", error);
  }
}

// 獲取活動顏色
function getActivityColor(type) {
  switch (type) {
    case "transport":
      return "#3366CC";
    case "sightseeing":
      return "#33CC33";
    case "activity":
      return "#FF9900";
    case "dining":
      return "#CC3333";
    case "accommodation":
      return "#9933CC";
    default:
      return "#999999";
  }
}

// 設定時間線
function setupTimeline() {
  const timelineDiv = document.getElementById("timeline");
  timelineDiv.innerHTML = "";

  // 為每一天創建時間線項目
  tripData.days.forEach((day, index) => {
    const dayLi = document.createElement("li");
    dayLi.className = `timeline-day ${day.type}`;
    if (index === selectedDay) {
      dayLi.className += " active";
    }

    // 取得日期和主要活動類型圖標
    const dateObj = new Date(day.date);
    const dateStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
    const activityIcon = getActivityIcon(day.type);

    dayLi.innerHTML = `
            <div style="font-weight:bold;font-size:16px;margin-bottom:4px;">D${day.day}</div>
            <div style="font-size:14px;margin-bottom:2px;">${dateStr}</div>
            <div style="display:flex;align-items:center;justify-content:center;margin-top:5px;">
                <i class="fas ${activityIcon}" style="font-size:18px;"></i>
            </div>
        `;

    // 添加滑鼠懸停效果
    dayLi.addEventListener("mouseenter", () => {
      const tooltip = document.createElement("div");
      tooltip.className = "day-tooltip";
      tooltip.innerHTML = `
                <div style="font-weight:bold;">${day.title}</div>
                <div style="font-size:12px;margin-top:4px;">${day.accommodation}</div>
            `;
      tooltip.style.position = "absolute";
      tooltip.style.bottom = "100%";
      tooltip.style.left = "50%";
      tooltip.style.transform = "translateX(-50%)";
      tooltip.style.backgroundColor = "white";
      tooltip.style.padding = "8px 12px";
      tooltip.style.borderRadius = "6px";
      tooltip.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
      tooltip.style.zIndex = "1000";
      tooltip.style.width = "180px";
      tooltip.style.textAlign = "center";
      dayLi.appendChild(tooltip);
    });

    dayLi.addEventListener("mouseleave", () => {
      const tooltip = dayLi.querySelector(".day-tooltip");
      if (tooltip) {
        dayLi.removeChild(tooltip);
      }
    });

    // 點擊事件處理
    dayLi.addEventListener("click", () => {
      selectedDay = index;
      shouldFitBounds = true; // 點擊時間線時重新啟用自動縮放
      // 更新時間線活動狀態
      document.querySelectorAll(".timeline-day").forEach((el, i) => {
        if (i === index) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });

      // 顯示日期詳情
      showDayDetails(index);

      // 動態過渡效果
      const dayIndicator = document.querySelector(".day-indicator");
      if (dayIndicator) {
        dayIndicator.classList.add("day-change");
        dayIndicator.textContent = `第${day.day}天: ${day.title}`;
        setTimeout(() => {
          dayIndicator.classList.remove("day-change");
        }, 500);
      }

      // 繪製路線並縮放地圖
      drawRoutes();
      drawLocations();
    });

    timelineDiv.appendChild(dayLi);
  });
}

let tourMode = false;
let currentStep = 0;
let totalSteps = 0;

// 初始化導覽功能
function setupTourGuide() {
  const startTourBtn = document.getElementById("start-tour");
  const prevStepBtn = document.getElementById("prev-step");
  const nextStepBtn = document.getElementById("next-step");

  if (!startTourBtn || !prevStepBtn || !nextStepBtn) {
    console.error("找不到導覽按鈕元素");
    return;
  }

  // 添加開始導覽按鈕事件
  startTourBtn.addEventListener("click", () => {
    tourMode = !tourMode;

    // 更新UI狀態
    const tourGuide = document.getElementById("tour-guide");
    if (tourMode) {
      startTourBtn.innerHTML = '<i class="fas fa-times"></i> 結束導覽';
      tourGuide.classList.add("active");
      startTour();
    } else {
      startTourBtn.innerHTML = '<i class="fas fa-route"></i> 導覽行程';
      tourGuide.classList.remove("active");
      endTour();
    }
  });

  // 添加上一步按鈕事件
  prevStepBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showTourStep();
      updateStepButtons();
    }
  });

  // 添加下一步按鈕事件
  nextStepBtn.addEventListener("click", () => {
    if (currentStep < totalSteps - 1) {
      currentStep++;
      showTourStep();
      updateStepButtons();
    }
  });

  // 初始化按鈕文本
  startTourBtn.innerHTML = '<i class="fas fa-route"></i> 導覽行程';
}

// 開始導覽
function startTour() {
  const day = tripData.days[selectedDay];

  // 設置總步驟數
  totalSteps = day.activities.length;
  currentStep = 0;

  // 顯示第一步
  showTourStep();
  updateStepButtons();
}

// 結束導覽
function endTour() {
  // 清除導覽內容
  const tourContent = document.getElementById("tour-content");
  if (tourContent) {
    tourContent.innerHTML = "";
  }

  // 重繪地圖標記
  drawLocations();
}

// 顯示導覽步驟
// 顯示導覽步驟
function showTourStep() {
  if (!myMap || !myMap.map || !mapInitialized) return;

  const day = tripData.days[selectedDay];
  const activity = day.activities[currentStep];
  const tourContent = document.getElementById("tour-content");

  if (!tourContent || !activity) return;

  // 構建導覽內容
  let additionalInfo = "";
  if (activity.type === "transport") {
    additionalInfo = getTransportDetails(day.day, activity.description);
  } else if (activity.type === "sightseeing" || activity.type === "activity") {
    additionalInfo = getSightseeingDetails(day.day, activity.description);
  }

  // 創建步驟進度指示器
  let progressDots = "";
  for (let i = 0; i < totalSteps; i++) {
    progressDots += `<div class="progress-dot ${
      i === currentStep ? "active" : ""
    }"></div>`;
  }

  tourContent.innerHTML = `
    <div class="tour-step">
      <h3>${activity.time}</h3>
      <p>${activity.description}</p>
      ${
        additionalInfo
          ? `<p class="tour-info"><i class="fas fa-info-circle"></i> ${additionalInfo}</p>`
          : ""
      }
      
      <div class="tour-progress">
        <span class="step-indicator">步驟 ${
          currentStep + 1
        }/${totalSteps}</span>
        <div class="progress-dots">
          ${progressDots}
        </div>
      </div>
    </div>
  `;

  // 高亮顯示當前活動
  highlightCurrentActivity(activity);
}
// 更新步驟按鈕狀態
function updateStepButtons() {
  const prevStepBtn = document.getElementById("prev-step");
  const nextStepBtn = document.getElementById("next-step");

  if (prevStepBtn) {
    prevStepBtn.disabled = currentStep === 0;
  }

  if (nextStepBtn) {
    nextStepBtn.disabled = currentStep === totalSteps - 1;
  }
}

// 高亮顯示當前活動
function highlightCurrentActivity(activity) {
  if (!myMap || !myMap.map || !mapInitialized) return;

  try {
    // 清除現有標記
    markers.forEach((marker) => {
      if (myMap && myMap.map && marker) {
        try {
          myMap.map.removeLayer(marker);
        } catch (e) {
          console.warn("移除標記時出錯:", e);
        }
      }
    });
    markers = [];

    // 繪製所有標記
    const day = tripData.days[selectedDay];
    let activityCounter = 1;

    day.activities.forEach((act) => {
      const isCurrentActivity = act === activity;

      act.locations.forEach((location) => {
        let color = getActivityColor(act.type);

        // 為當前活動點創建特殊樣式
        const marker = L.marker([location.lat, location.lng], {
          icon: L.divIcon({
            className: `activity-marker ${
              isCurrentActivity ? "highlight-pulse" : ""
            }`,
            html: `<div style="display:flex; align-items:center; justify-content:center; background-color:${
              isCurrentActivity ? "#e74c3c" : color
            }; color:white; width:${
              isCurrentActivity ? "48px" : "36px"
            }; height:${
              isCurrentActivity ? "48px" : "36px"
            }; border-radius:50%; font-size:${
              isCurrentActivity ? "20px" : "16px"
            }; font-weight:bold; box-shadow:0 2px 8px rgba(0,0,0,${
              isCurrentActivity ? "0.5" : "0.2"
            });">${activityCounter}</div>`,
            iconSize: [
              isCurrentActivity ? 48 : 36,
              isCurrentActivity ? 48 : 36,
            ],
            iconAnchor: [
              isCurrentActivity ? 24 : 18,
              isCurrentActivity ? 24 : 18,
            ],
          }),
        }).addTo(myMap.map);

        // 創建豐富的彈出信息
        marker.bindPopup(
          `
            <div style="min-width:250px;">
              <h3 style="margin:0 0 8px 0; color:${color}; border-bottom:2px solid ${color};">${
            location.name
          }</h3>
              <p style="margin:5px 0;"><i class="fas fa-clock"></i> <strong>${
                act.time
              }</strong></p>
              <p style="margin:5px 0;">${act.description}</p>
              ${
                isCurrentActivity
                  ? `<p style="margin:5px 0; font-style:italic; color:#e74c3c;">► 當前導覽步驟</p>`
                  : ""
              }
            </div>
          `,
          {
            maxWidth: 300,
          }
        );

        if (isCurrentActivity) {
          marker.openPopup();

          // 縮放到當前活動位置
          myMap.map.setView([location.lat, location.lng], 14);
        }

        markers.push(marker);
        activityCounter++;
      });
    });

    // 繪製當日路徑，突出顯示當前活動段
    drawDayPathWithHighlight(day, activity);
  } catch (error) {
    console.error("高亮顯示當前活動時發生錯誤:", error);
  }
}
// 繪製當日路徑並高亮當前段
// 繪製當日路徑並高亮當前段
function drawDayPathWithHighlight(day, currentActivity) {
  try {
    // 先找出所有地點
    let allPoints = [];
    let currentActivityIndex = -1;

    day.activities.forEach((activity, index) => {
      if (activity === currentActivity) {
        currentActivityIndex = allPoints.length;
      }

      activity.locations.forEach((loc) => {
        allPoints.push([loc.lat, loc.lng]);
      });
    });

    if (allPoints.length > 1) {
      // 繪製整條路徑
      const fullPath = L.polyline(allPoints, {
        color: "#a0a0a0",
        weight: 2,
        opacity: 0.6,
        dashArray: "5, 10",
        lineJoin: "round",
      }).addTo(myMap.map);
      markers.push(fullPath);

      // 如果有當前活動，高亮顯示該段
      if (
        currentActivityIndex >= 0 &&
        currentActivityIndex < allPoints.length - 1
      ) {
        const highlightPath = L.polyline(
          [
            allPoints[currentActivityIndex],
            allPoints[currentActivityIndex + 1],
          ],
          {
            color: "#e74c3c",
            weight: 4,
            opacity: 0.8,
            lineJoin: "round",
          }
        ).addTo(myMap.map);
        markers.push(highlightPath);
      }
    }
  } catch (error) {
    console.error("繪製高亮路徑時發生錯誤:", error);
  }
}

function getActivityIcon(type) {
  switch (type) {
    case "transport":
      return "fa-train";
    case "nature":
      return "fa-mountain";
    case "city":
      return "fa-city";
    case "transfer":
      return "fa-exchange-alt";
    default:
      return "fa-map-marker-alt";
  }
}
// 顯示每日行程詳情
// 增強顯示每日詳情的函數
function showDayDetails(dayIndex) {
  // 如果處於導覽模式，先關閉導覽
  if (tourMode) {
    tourMode = false;
    const tourGuide = document.getElementById("tour-guide");
    const startTourBtn = document.getElementById("start-tour");

    if (tourGuide) tourGuide.classList.remove("active");
    if (startTourBtn)
      startTourBtn.innerHTML = '<i class="fas fa-route"></i> 導覽行程';
  }
  const day = tripData.days[dayIndex];
  const detailsDiv = document.getElementById("daily-details");

  // 格式化日期
  const dateObj = new Date(day.date);
  const dateStr = `${dateObj.getFullYear()}年${
    dateObj.getMonth() + 1
  }月${dateObj.getDate()}日`;

  let html = `
        <div class="day-header">
            <h2>第${day.day}天：${dateStr}</h2>
            <h3>${day.title}</h3>
            <div class="accommodation-info">
                <i class="fas fa-bed"></i> ${day.accommodation}
            </div>
        </div>
        
        <div class="day-activities">
    `;

  // 按時間順序顯示活動
  day.activities.forEach((activity, index) => {
    const activityIcon = activityIcons[activity.type] || "fa-map-marker-alt";
    const activityColor = getActivityColor(activity.type);

    html += `
            <div class="activity-card" onclick="showActivityDetails(${index})">
                <div class="activity-icon" style="background-color: ${activityColor}">
                    <i class="fas ${activityIcon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-time">${activity.time}</div>
                    <div class="activity-description">${
                      activity.description
                    }</div>
                    <div class="activity-locations">
                        ${
                          activity.locations && activity.locations.length > 0
                            ? `<small>${activity.locations
                                .map((loc) => loc.name)
                                .join(" → ")}</small>`
                            : ""
                        }
                    </div>
                </div>
                <div class="activity-more">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `;
  });

  html += `
        </div>
        
        <div class="day-notes">
            <div class="notes-title"><i class="fas fa-exclamation-circle"></i> 注意事項</div>
            <div class="notes-content">${day.notes}</div>
        </div>
    `;

  detailsDiv.innerHTML = html;
}

function toggleSection(header) {
  const content = header.nextElementSibling;
  const icon = header.querySelector(".toggle-icon");

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  }
}
function getTransportDetails(dayNumber, description) {
  // 根據行程Excel檔案中的詳細資訊添加
  const transportDetails = {
    0: "阿聯酋航空班機，經杜拜轉機。請提前3小時抵達機場辦理登機手續。",
    1: "IC8列車(0700 IC8): 蘇黎世機場→因特拉肯東站(0920)，轉乘BOB列車→格林德瓦(1010)。Swiss Travel Pass可使用，車票價格CHF 50-80。",
    4: "格林德瓦→因特拉肯東站(BOB, 30分鐘)→盧塞恩(IC8, 2小時)。建議使用SBB App查詢即時列車時間。",
    7: "黃金列車路線：盧塞恩(0706)→因特拉肯東站(0854)→茨魏西門(1020)→蒙特勒(1417)→維斯普(1550-1611)→采爾馬特(1717)。全程景觀壯麗，可沿途欣賞圖恩湖、布里恩茨湖等美景。",
    9: "冰川列車：采爾馬特(0852)→庫爾(約7小時)→蘇黎世(1620)。瑞士最著名的全景列車，沿途可欣賞壯麗的阿爾卑斯山景。",
    12: "蘇黎世→國王湖→奧格斯堡。跨越瑞士進入德國，國王湖是德國最美麗的高山湖泊之一。",
    15: "阿聯酋航空返程班機，請注意轉機時間和登機門資訊。",
    16: "返程最後一段，準備回到溫暖的家！"
  };

  return transportDetails[dayNumber] || "";
}

// 從Excel資料中獲取更詳細的景點資訊
function getSightseeingDetails(dayNumber, description) {
  // 根據行程Excel檔案中的詳細資訊添加
  const sightseeingDetails = {
    2: "First纜車營業時間：0900-1500。Adventure Package包含First Glider(CHF 130)、First Flyer(CHF 80)等活動，套票約CHF 125。",
    3: "少女峰票價約CHF 201，Swiss Travel Pass可享75%折扣。參觀Sphinx觀景台、冰宮和阿爾卑斯感官體驗。",
    5: "皮拉圖斯Golden Round Trip包括搭乘纜車上山、齒軌鐵道下山，票價約CHF 72，Swiss Travel Pass可免費。纜車上山時間約30分鐘。",
    6: "鐵力士山纜車票價約CHF 92。特色活動：Titlis Cliff Walk懸崖步道和冰川公園，開放時間09:00-17:00。",
    8: "哥內格拉特觀景台票價約CHF 98-126。在里菲爾湖可以看到馬特洪峰倒影，哥內格拉特海拔3,135米，提供360度全景觀賞。",
    10: "萊茵瀑布是歐洲最大的瀑布，門票約CHF 5。伊瑟特瓦爾德和布里恩茨湖風景優美，是著名的拍照點。",
    11: "班霍夫大街是蘇黎世最著名的購物街。施普倫利是百年巧克力店(營業時間07:30-18:30)。瑞士傳統馬鈴薯餅Rösti約CHF 25-35。",
  };

  return sightseeingDetails[dayNumber] || "";
}

// 獲取Excel文件中的額外資訊
function getExtraInformation(dayNumber) {
  // 根據行程Excel檔案中的特別提示添加
  const extraInfo = {
    1: "<p>從蘇黎世機場搭乘IC8班次至因特拉肯東站需要約1小時50分鐘...</p>",
    1: "<p>抵達後請留意Check-in時間為15:00後。從格林德瓦火車站到Hotel Gletscherblick步行約20分鐘。</p>",
    7: "<p>黃金列車全程行駛時間較長，請提前準備零食或在列車上用餐。列車票價已包含在Swiss Travel Pass中。</p>",
    8: "<p>采爾馬特是無汽車區域，只能徒步或搭乘電動車移動。Gornergrat火車每30分鐘一班，請注意時刻表。</p>",
    9: "<p>冰川列車建議提前預訂座位。抵達蘇黎世西區公寓後，可使用公寓提供的設施。</p>",
    12: "<p>從蘇黎世到奧格斯堡約需5小時車程，建議提前規劃路線。My Suite II - Augsburg City提供廚房設施，可自行準備餐食。</p>",
  };

  return flightDetails[dayNumber] || extraInfo[dayNumber] || "";
}
function formatFlightInfo(activity) {
  if (!activity.flightInfo) return "";
  
  const info = activity.flightInfo;
  return `
    <div class="flight-details">
      <strong>航班詳情：</strong><br>
      航空公司：${info.airline}<br>
      航線：${info.from} → ${info.to}<br>
      飛行時間：${info.duration}
    </div>
  `;
}
window.showActivityDetails = function (activityId, event) {
  try {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    const day = tripData.days[selectedDay];
    const activity = day.activities[activityId];
    
    if (!activity) {
      console.error("找不到活動數據:", activityId);
      return;
    }
    
    // 移除舊有的彈出窗口
    const oldModals = document.querySelectorAll(".details-modal");
    oldModals.forEach((modal) => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    });
    
    let additionalInfo = "";
    
    // 根據活動類型生成詳細信息
    if (activity.type === "transport" || activity.type === "departure" || activity.type === "arrival") {
      additionalInfo = getTransportDetails(day.day, activity.description);
    } else if (activity.type === "sightseeing" || activity.type === "activity") {
      additionalInfo = getSightseeingDetails(day.day, activity.description);
    }
    
    // 如果是航班活動，添加航班詳情
    if (activity.flightInfo) {
      additionalInfo += formatFlightInfo(activity);
    }
    
    // 顯示訂票代號（如果是第0天或第15天）
    let bookingInfo = "";
    if (day.day === 0 || day.day === 15 || day.day === 16) {
      bookingInfo = `<p><strong>訂票代號：</strong><span class="booking-code">${tripData.flightBookingCode}</span></p>`;
    }
    
    const detailsModal = document.createElement("div");
    detailsModal.className = "details-modal";
    
    detailsModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${activity.description}</h3>
          <span class="close-modal" onclick="closeModal(this)">&times;</span>
        </div>
        <div class="modal-body">
          <p><strong>時間：</strong>${activity.time}</p>
          <p><strong>類型：</strong>${getActivityTypeName(activity.type)}</p>
          ${bookingInfo}
          ${additionalInfo ? `<div class="additional-info">${additionalInfo}</div>` : ""}
        </div>
      </div>
    `;
    
    document.body.appendChild(detailsModal);
    
    // 確保模態窗口可見
    setTimeout(() => {
      detailsModal.style.opacity = "1";
      detailsModal.querySelector(".modal-content").style.transform = "translateY(0)";
    }, 10);
    
  } catch (error) {
    console.error("顯示活動詳情時出錯:", error);
    alert("無法顯示活動詳情，請查看控制台獲取更多信息。");
  }
};
// 視窗大小變更時調整畫布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.7);
}
window.toggleSection = function (header) {
  const content = header.nextElementSibling;
  const icon = header.querySelector(".toggle-icon");

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  }
};

// 添加查看詳細信息的功能
window.showActivityDetails = function (activityId, event) {
  try {
    // 阻止事件冒泡，防止地圖捕獲點擊事件
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    console.log("顯示活動詳情", activityId);

    const day = tripData.days[selectedDay];
    const activity = day.activities[activityId];

    if (!activity) {
      console.error("找不到活動數據:", activityId);
      return;
    }

    // 移除舊有的彈出窗口
    const oldModals = document.querySelectorAll(".details-modal");
    oldModals.forEach((modal) => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    });

    // 創建新的彈出窗口
    const detailsModal = document.createElement("div");
    detailsModal.className = "details-modal";

    let additionalInfo = "";
    if (activity.type === "transport") {
      additionalInfo = getTransportDetails(day.day, activity.description);
    } else if (
      activity.type === "sightseeing" ||
      activity.type === "activity"
    ) {
      additionalInfo = getSightseeingDetails(day.day, activity.description);
    }

    detailsModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${activity.time} - ${activity.description}</h3>
          <span class="close-modal" onclick="closeModal(this)">&times;</span>
        </div>
        <div class="modal-body">
          <p><strong>類型:</strong> ${getActivityTypeName(activity.type)}</p>
          ${
            activity.locations && activity.locations.length > 0
              ? `<p><strong>地點:</strong> ${activity.locations
                  .map((loc) => loc.name)
                  .join(" → ")}</p>`
              : ""
          }
          ${
            additionalInfo
              ? `<div class="additional-info">${additionalInfo}</div>`
              : ""
          }
        </div>
      </div>
    `;

    document.body.appendChild(detailsModal);

    // 確保模態窗口可見
    setTimeout(() => {
      detailsModal.style.opacity = "1";
      detailsModal.querySelector(".modal-content").style.transform =
        "translateY(0)";
    }, 10);
  } catch (error) {
    console.error("顯示活動詳情時出錯:", error);
    alert("無法顯示活動詳情，請查看控制台獲取更多信息。");
  }
};

window.closeModal = function (closeBtn) {
  try {
    const modal = closeBtn.closest(".details-modal");
    if (modal) {
      // 添加淡出動畫
      modal.style.opacity = "0";
      modal.querySelector(".modal-content").style.transform =
        "translateY(20px)";

      // 等待動畫完成後移除元素
      setTimeout(() => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      }, 300);
    }
  } catch (error) {
    console.error("關閉模態窗口時出錯:", error);
  }
};

function getActivityTypeName(type) {
  const types = {
    transport: "交通",
    sightseeing: "景點參觀",
    activity: "特色體驗",
    dining: "餐飲",
    accommodation: "住宿",
  };
  return types[type] || type;
}
