// 瑞士16日遊行程資料
const tripData = {
  
  startDate: "2025-09-12", // 更新為實際出發日期
  endDate: "2025-09-27",   // 更新為實際返抵日期
  flightBookingCode: "KCL2VN", // 新增訂票代號
  totalDays: 17, // 更新總天數（含機票日）
  
  days: [
    // === Day 0: 出發航班 ===
    {
      date: "2025-09-12",
      day: 0,
      title: "台北→蘇黎世（經杜拜轉機）",
      accommodation: "機上過夜",
      type: "flight",
      activities: [
        {
          time: "00:30",
          description: "台北桃園機場起飛",
          type: "departure",
          flightInfo: {
            airline: "阿聯酋航空",
            from: "台北桃園機場 (TPE)",
            to: "杜拜國際機場 (DXB)",
            duration: "8小時45分鐘"
          },
          locations: [
            { name: "台北桃園機場", lat: 25.0797, lng: 121.2342 },
            { name: "杜拜國際機場", lat: 25.2532, lng: 55.3657 }
          ]
        },
        {
          time: "05:15",
          description: "抵達杜拜國際機場",
          type: "arrival",
          locations: [
            { name: "杜拜國際機場", lat: 25.2532, lng: 55.3657 }
          ]
        },
        {
          time: "05:15-15:35",
          description: "杜拜機場轉機等待（10小時20分鐘）",
          type: "layover",
          locations: [
            { name: "杜拜國際機場", lat: 25.2532, lng: 55.3657 }
          ]
        },
        {
          time: "15:35",
          description: "杜拜起飛前往蘇黎世",
          type: "departure",
          flightInfo: {
            airline: "阿聯酋航空",
            from: "杜拜國際機場 (DXB)",
            to: "蘇黎世機場 (ZUR)",
            duration: "6小時45分鐘"
          },
          locations: [
            { name: "杜拜國際機場", lat: 25.2532, lng: 55.3657 },
            { name: "蘇黎世機場", lat: 47.451542, lng: 8.564572 }
          ]
        },
        {
          time: "20:20",
          description: "抵達蘇黎世機場",
          type: "arrival",
          locations: [
            { name: "蘇黎世機場", lat: 47.451542, lng: 8.564572 }
          ]
        }
      ],
      notes: "訂票代號：KCL2VN。建議提前3小時抵達桃園機場辦理登機手續。杜拜轉機時間充裕，可在機場免稅店購物或休息。"
    },
    {
      date: "2025-09-13",
      day: 1,
      title: "抵達蘇黎世去格林德瓦散步&check in",
      accommodation: "Hotel Gletscherblick Grindelwald",
      type: "transport",
      activities: [
        {
          time: "07:00-10:10",
          description: "蘇黎世機場→格林德瓦 (0700 IC8 Interlaken Ost 0920 BOB Grindelwald 1010)",
          type: "transport",
          locations: [
            { name: "蘇黎世機場", lat: 47.451542, lng: 8.564572 },
            { name: "因特拉肯東站", lat: 46.690556, lng: 7.869472 },
            { name: "格林德瓦", lat: 46.62396, lng: 8.03601 }
          ],
        },
        {
          time: "10:20-12:30",
          description: "格林德瓦教堂散步",
          type: "sightseeing",
          locations: [{ name: "格林德瓦教堂", lat: 46.6244, lng: 8.0337 }],
        },
        {
          time: "12:30-14:00",
          description: "享用Fondue或Raclette",
          type: "dining",
          locations: [{ name: "格林德瓦中心", lat: 46.6244, lng: 8.0344 }],
        },
        {
          time: "17:00-18:00",
          description: "Check-in Hotel Gletscherblick",
          type: "accommodation",
          locations: [
            { name: "Hotel Gletscherblick", lat: 46.628001, lng: 8.047025 },
          ],
        },
      ],
      notes: "住宿：Hotel Gletscherblick Grindelwald，Check-in時間為15:00後。"
    },
    {
      date: "2025-09-14",
      day: 2,
      title: "First",
      accommodation: "Hotel Gletscherblick Grindelwald",
      type: "nature",
      activities: [
        {
          time: "08:30-09:00",
          description: "前往First",
          type: "transport",
          locations: [
            { name: "格林德瓦", lat: 46.62396, lng: 8.03601 },
            { name: "First", lat: 46.6564, lng: 8.0484 },
          ],
        },
        {
          time: "09:00-15:00",
          description:
            "First Cliff Walk by Tissot、First Flyer、First Glider等活動",
          type: "activity",
          locations: [
            { name: "First Cliff Walk", lat: 46.6564, lng: 8.0484 },
            { name: "Hotel Gletscherblick", lat: 46.628001, lng: 8.047025 },
          ],
        },
      ],
      notes:
        "First纜車營業時間：0900-1500，Adventure Package包含First Glider、First Flyer等活動，票價約CHF 125。",
    },
    {
      date: "2025-09-15",
      day: 3,
      title: "少女峰(Jungfraujoch)",
      accommodation: "Hotel Gletscherblick Grindelwald",
      type: "nature",
      activities: [
        {
          time: "08:00-09:00",
          description: "格林德瓦→小夏戴克 (WAB列車)",
          type: "transport",
          locations: [
            { name: "格林德瓦", lat: 46.62396, lng: 8.03601 },
            { name: "小夏戴克", lat: 46.5846, lng: 7.9597 },
          ],
        },
        {
          time: "09:00-09:45",
          description: "小夏戴克→少女峰 (Jungfraubahn)",
          type: "transport",
          locations: [
            { name: "小夏戴克", lat: 46.5846, lng: 7.9597 },
            { name: "少女峰", lat: 46.537, lng: 7.9621 },
          ],
        },
        {
          time: "09:45-12:00",
          description: "少女峰頂觀景台、冰宮、阿爾卑斯感官體驗",
          type: "sightseeing",
          locations: [{ name: "少女峰", lat: 46.537, lng: 7.9621 }],
        },
        {
          time: "12:00-13:45",
          description: "返回格林德瓦",
          type: "transport",
          locations: [
            { name: "少女峰", lat: 46.537, lng: 7.9621 },
            { name: "小夏戴克", lat: 46.5846, lng: 7.9597 },
            { name: "格林德瓦", lat: 46.62396, lng: 8.03601 },
            { name: "Hotel Gletscherblick", lat: 46.628001, lng: 8.047025 },
          ],
        },
      ],
      notes:
        "少女峰票價：約CHF 201，Swiss Travel Pass可享75%折扣。探訪Sphinx觀景台、冰宮和阿爾卑斯感官體驗。",
    },
    {
      date: "2025-09-16",
      day: 4,
      title: "格林德瓦→盧塞恩",
      accommodation: "Hotel Alpha Luzern",
      type: "transfer",
      activities: [
        {
          time: "09:00-11:00",
          description: "格林德瓦→盧塞恩 (Grindelwald-Interlaken Ost-Luzern)",
          type: "transport",
          locations: [
            { name: "格林德瓦", lat: 46.62396, lng: 8.03601 },
            { name: "因特拉肯東站", lat: 46.690556, lng: 7.869472 },
            { name: "盧塞恩", lat: 47.05048, lng: 8.30635 },
          ],
        },
        {
          time: "11:30-16:00",
          description: "盧塞恩市區觀光：卡佩爾橋、維爾瓦爾德施泰特湖、水塔等",
          type: "sightseeing",
          locations: [
            { name: "卡佩爾橋", lat: 47.0516, lng: 8.3074 },
            { name: "維爾瓦爾德施泰特湖", lat: 47.0422, lng: 8.3171 },
            { name: "水塔", lat: 47.0517, lng: 8.3082 },
          ],
        },
        {
          time: "16:00",
          description: "Check-in Hotel Alpha Luzern",
          type: "accommodation",
          locations: [
            { name: "Hotel Alpha Luzern", lat: 47.046929, lng: 8.301654 },
          ],
        },
      ],
      notes: "盧塞恩市區景點包括卡佩爾橋、水塔、耶穌會教堂、洛溫獅子紀念碑等。",
    },
    {
      date: "2025-09-17",
      day: 5,
      title: "皮拉圖斯山(Pilatus)",
      accommodation: "Hotel Alpha Luzern",
      type: "nature",
      activities: [
        {
          time: "08:30",
          description: "盧塞恩→克里恩斯",
          type: "transport",
          locations: [
            { name: "盧塞恩", lat: 47.05048, lng: 8.30635 },
            { name: "克里恩斯", lat: 47.0272, lng: 8.278 },
          ],
        },
        {
          time: "09:00",
          description: "搭乘纜車上皮拉圖斯山",
          type: "transport",
          locations: [
            { name: "克里恩斯", lat: 47.0272, lng: 8.278 },
            { name: "皮拉圖斯山", lat: 46.9794, lng: 8.2528 },
          ],
        },
        {
          time: "15:00",
          description: "下山至阿爾普納赫施塔德",
          type: "transport",
          locations: [
            { name: "皮拉圖斯山", lat: 46.9794, lng: 8.2528 },
            { name: "阿爾普納赫施塔德", lat: 46.9652, lng: 8.2853 },
            { name: "Hotel Alpha Luzern", lat: 47.046929, lng: 8.301654 },
          ],
        },
      ],
      notes:
        "Golden Round Trip包括搭乘纜車上山、齒軌鐵道下山，票價約CHF 72，Swiss Travel Pass可免費。",
    },
    {
      date: "2025-09-18",
      day: 6,
      title: "鐵力士山(Titlis)",
      accommodation: "Hotel Alpha Luzern",
      type: "nature",
      activities: [
        {
          time: "08:00",
          description: "盧塞恩→恩格爾貝格",
          type: "transport",
          locations: [
            { name: "盧塞恩", lat: 47.05048, lng: 8.30635 },
            { name: "恩格爾貝格", lat: 46.8182, lng: 8.4037 },
          ],
        },
        {
          time: "09:00-15:00",
          description: "搭乘纜車上鐵力士山、冰川公園、Cliff Walk等活動",
          type: "activity",
          locations: [
            { name: "恩格爾貝格", lat: 46.8182, lng: 8.4037 },
            { name: "特呂布湖", lat: 46.8013, lng: 8.3902 },
            { name: "鐵力士山", lat: 46.7712, lng: 8.4257 },
            { name: "Hotel Alpha Luzern", lat: 47.046929, lng: 8.301654 },
          ],
        },
      ],
      notes: "鐵力士山纜車票價約CHF 92，可體驗Titlis Cliff Walk和冰川公園。",
    },
    {
      date: "2025-09-19",
      day: 7,
      title: "黃金列車路線前往采爾馬特",
      accommodation: "Hotel Cheminee Zermatt",
      type: "transfer",
      activities: [
        {
          time: "07:06-10:20",
          description: "盧塞恩→因特拉肯→茨魏西門 (Golden Pass線)",
          type: "transport",
          locations: [
            { name: "盧塞恩", lat: 47.05048, lng: 8.30635 },
            { name: "因特拉肯東站", lat: 46.690556, lng: 7.869472 },
            { name: "茨魏西門", lat: 46.5534, lng: 7.3778 },
          ],
        },
        {
          time: "12:02-14:17",
          description: "茨魏西門→蒙特勒 (黃金列車)",
          type: "transport",
          locations: [
            { name: "茨魏西門", lat: 46.5534, lng: 7.3778 },
            { name: "蒙特勒", lat: 46.4312, lng: 6.9107 },
          ],
        },
        {
          time: "14:36-17:17",
          description: "蒙特勒→維斯普→采爾馬特",
          type: "transport",
          locations: [
            { name: "蒙特勒", lat: 46.4312, lng: 6.9107 },
            { name: "維斯普", lat: 46.294, lng: 7.8822 },
            { name: "采爾馬特", lat: 46.0217, lng: 7.749 },
          ],
        },
        {
          time: "晚上",
          description: "參觀馬特洪峰觀景點&check in",
          type: "sightseeing",
          locations: [
            {
              name: "Hotel-Steakhouse Cheminée & Halali Bar",
              lat: 46.022442,
              lng: 7.751421,
            },
            { name: "馬特洪峰觀景點", lat: 46.0188, lng: 7.7467 },
          ],
        },
      ],
      notes:
        "黃金列車沿途可欣賞圖恩湖、布里恩茨湖等美景。行車時間：盧塞恩→因特拉肯：1小時50分鐘，因特拉肯→茨魏西門：1小時10分鐘，茨魏西門→蒙特勒：2小時15分鐘，蒙特勒→采爾馬特：2小時40分鐘。",
    },
    {
      date: "2025-09-20",
      day: 8,
      title: "哥內格拉特(Gornergrat)、馬特洪峰",
      accommodation: "Hotel Cheminee Zermatt",
      type: "nature",
      activities: [
        {
          time: "08:00-08:33",
          description: "采爾馬特→里菲爾貝格 (Gornergrat火車)",
          type: "transport",
          locations: [
            { name: "采爾馬特", lat: 46.0217, lng: 7.749 },
            { name: "里菲爾貝格", lat: 46.0279, lng: 7.7531 },
          ],
        },
        {
          time: "10:00-15:20",
          description: "里菲爾湖、哥內格拉特觀景台",
          type: "sightseeing",
          locations: [
            { name: "里菲爾湖", lat: 46.0279, lng: 7.7531 },
            { name: "哥內格拉特", lat: 45.9836, lng: 7.7714 },
            {
              name: "Hotel-Steakhouse Cheminée & Halali Bar",
              lat: 46.022442,
              lng: 7.751421,
            },
          ],
        },
      ],
      notes:
        "Gornergrat火車票價約CHF 98-126，可欣賞馬特洪峰壯麗景色。在里菲爾湖可以看到馬特洪峰倒影。",
    },
    {
      date: "2025-09-21",
      day: 9,
      title: "采爾馬特→蘇黎世(冰川列車)",
      accommodation:
        "Zurich West公寓(one bedroom apartment in trendy Zurich West)",
      type: "transfer",
      activities: [
        {
          time: "08:52-16:20",
          description: "采爾馬特→庫爾→蘇黎世 (冰川列車)",
          type: "transport",
          locations: [
            { name: "采爾馬特", lat: 46.0217, lng: 7.749 },
            { name: "庫爾", lat: 46.8508, lng: 9.531 },
            { name: "蘇黎世主站", lat: 47.3769, lng: 8.5417 },
          ],
        },
        {
          time: "晚上",
          description:
            "入住蘇黎世西區公寓(one bedroom apartment in trendy Zurich West)",
          type: "accommodation",
          locations: [
            {
              name:
                "蘇黎世西區公寓(one bedroom apartment in trendy Zurich West)",
              lat: 47.383347,
              lng: 8.506269,
            },
          ],
        },
      ],
      notes:
        "冰川列車是瑞士最著名的全景列車之一，全程約7小時。沿途可欣賞壯麗的阿爾卑斯山景。",
    },
    {
      date: "2025-09-22",
      day: 10,
      title: "萊茵瀑布、伊瑟特瓦爾德",
      accommodation:
        "Zurich West公寓(one bedroom apartment in trendy Zurich West)",
      type: "sightseeing",
      activities: [
        {
          time: "08:00-09:00",
          description: "蘇黎世→沙夫豪森",
          type: "transport",
          locations: [
            { name: "蘇黎世主站", lat: 47.3769, lng: 8.5417 },
            { name: "沙夫豪森", lat: 47.6957, lng: 8.6379 },
          ],
        },
        {
          time: "09:00-11:00",
          description: "參觀萊茵瀑布",
          type: "sightseeing",
          locations: [{ name: "萊茵瀑布", lat: 47.6778, lng: 8.6163 }],
        },
        {
          time: "14:00-17:00",
          description: "伊瑟特瓦爾德、布里恩茨湖",
          type: "sightseeing",
          locations: [
            { name: "伊瑟特瓦爾德", lat:  46.712087, lng: 7.963030  },
            {
              name:
                "蘇黎世西區公寓(one bedroom apartment in trendy Zurich West)",
              lat: 47.383347,
              lng: 8.506269,
            },
          ],
        },
      ],
      notes:
        "萊茵瀑布是歐洲最大的瀑布，參觀票價約CHF 5。從沙夫豪森到伊瑟特瓦爾德約需3小時車程。",
    },
    {
      date: "2025-09-23",
      day: 11,
      title: "蘇黎世市區",
      accommodation:
        "Zurich West公寓(one bedroom apartment in trendy Zurich West)",
      type: "city",
      activities: [
        {
          time: "10:00-12:00",
          description: "班霍夫大街、施普倫利巧克力店",
          type: "sightseeing",
          locations: [
            { name: "班霍夫大街", lat: 47.3723, lng: 8.5386 },
            { name: "施普倫利巧克力店", lat: 47.3698, lng: 8.5388 },
          ],
        },
        {
          time: "12:00-14:00",
          description: "享用傳統瑞士菜Rösti",
          type: "dining",
          locations: [{ name: "Swiss Chuchi", lat: 47.3718, lng: 8.5427 }],
        },
        {
          time: "14:00-17:00",
          description: "蘇黎世湖、林登霍夫山丘、利馬特河",
          type: "sightseeing",
          locations: [
            { name: "蘇黎世湖", lat: 47.3455, lng: 8.5412 },
            { name: "林登霍夫山丘", lat: 47.3727, lng: 8.5406 },
            { name: "利馬特河", lat: 47.3727, lng: 8.5412 },
            {
              name:
                "蘇黎世西區公寓(one bedroom apartment in trendy Zurich West)",
              lat: 47.383347,
              lng: 8.506269,
            },
          ],
        },
      ],
      notes:
        "班霍夫大街是蘇黎世最著名的購物街，施普倫利是百年巧克力店，Rösti是瑞士傳統馬鈴薯餅，約CHF 25-35。",
    },
    {
      date: "2025-09-24",
      day: 12,
      title: "蘇黎世→奧格斯堡",
      accommodation: "My Suite II - Augsburg City",
      type: "transfer",
      activities: [
        {
          time: "上午",
          description: "蘇黎世舊城區、大教堂",
          type: "sightseeing",
          locations: [
            {
              name:
                "蘇黎世西區公寓(one bedroom apartment in trendy Zurich West)",
              lat: 47.383347,
              lng: 8.506269,
            },
            { name: "舊城區", lat: 47.3717, lng: 8.5428 },
            { name: "大教堂", lat: 47.3701, lng: 8.544 },
          ],
        },
        {
          time: "下午",
          description:
            "前往奧格斯堡，國王湖Check-in(My Suite II - Augsburg City)",
          type: "transport",
          locations: [
            { name: "蘇黎世主站", lat: 47.3769, lng: 8.5417 },
            { name: "國王湖", lat: 47.5952, lng: 12.9856 },
            { name: "奧格斯堡", lat: 48.3705, lng: 10.8978 },
            {
              name: "住宿:My Suite II - Augsburg City",
              lat: 48.373598,
              lng: 10.88899,
            },
          ],
        },
      ],
      notes:
        "My Suite II - Augsburg City是最後三晚的住宿。國王湖是德國最美麗的高山湖泊之一。從蘇黎世到奧格斯堡約需5小時。",
    },
    {
      date: "2025-09-25",
      day: 13,
      title: "諾德林根",
      accommodation: "My Suite II - Augsburg City",
      type: "city",
      activities: [
        {
          time: "09:00-16:00",
          description: "諾德林根一日遊",
          type: "sightseeing",
          locations: [
            { name: "諾德林根", lat: 48.8503, lng: 10.4892 },
            {
              name: "住宿:My Suite II - Augsburg City",
              lat: 48.373598,
              lng: 10.88899,
            },
          ],
        },
      ],
      notes:
        "諾德林根是保存完好的中世紀小鎮，以完整的城牆著稱。從奧格斯堡到諾德林根約需1小時車程。",
    },
    {
      date: "2025-09-26",
      day: 14,
      title: "返家",
      accommodation: "回家",
      type: "transport",
      activities: [
        {
          time: "08:00-11:00",
          description: "準備返家",
          type: "transport",
          locations: [
            {
              name: "住宿:My Suite II - Augsburg City",
              lat: 48.373598,
              lng: 10.88899,
            },
            { name: "奧格斯堡", lat: 48.3705, lng: 10.8978 },
            { name: "慕尼黑機場", lat: 48.354336, lng: 11.787216 },
          ],
        },
      ],
      notes: "行程結束，返家。確保提前規劃前往機場的交通。",
    },
        {
      date: "2025-09-26",
      day: 15,
      title: "慕尼黑→台北（經杜拜轉機）第一段",
      accommodation: "機上過夜",
      type: "flight",
      activities: [
        {
          time: "12:00-14:00",
          description: "前往慕尼黑機場",
          type: "transport",
          locations: [
            { name: "奧格斯堡", lat: 48.3705, lng: 10.8978 },
            { name: "慕尼黑機場", lat: 48.354336, lng: 11.787216 }
          ]
        },
        {
          time: "15:40",
          description: "慕尼黑機場起飛",
          type: "departure",
          flightInfo: {
            airline: "阿聯酋航空",
            from: "慕尼黑機場 (MUC)",
            to: "杜拜國際機場 (DXB)",
            duration: "6小時5分鐘"
          },
          locations: [
            { name: "慕尼黑機場", lat: 48.354336, lng: 11.787216 },
            { name: "杜拜國際機場", lat: 25.2532, lng: 55.3657 }
          ]
        },
        {
          time: "23:45",
          description: "抵達杜拜國際機場",
          type: "arrival",
          locations: [
            { name: "杜拜國際機場", lat: 25.2532, lng: 55.3657 }
          ]
        }
      ],
      notes: "訂票代號：KCL2VN。建議提前3小時抵達慕尼黑機場。在杜拜轉機等待約8小時55分鐘。"
    },
    
    // === Day 16: 返程航班第二段 ===
    {
      date: "2025-09-27",
      day: 16,
      title: "杜拜→台北（返抵）",
      accommodation: "回到溫暖的家",
      type: "flight",
      activities: [
        {
          time: "00:00-08:40",
          description: "杜拜機場轉機等待",
          type: "layover",
          locations: [
            { name: "杜拜國際機場", lat: 25.2532, lng: 55.3657 }
          ]
        },
        {
          time: "08:40",
          description: "杜拜起飛前往台北",
          type: "departure",
          flightInfo: {
            airline: "阿聯酋航空",
            from: "杜拜國際機場 (DXB)",
            to: "台北桃園機場 (TPE)",
            duration: "8小時35分鐘"
          },
          locations: [
            { name: "杜拜國際機場", lat: 25.2532, lng: 55.3657 },
            { name: "台北桃園機場", lat: 25.0797, lng: 121.2342 }
          ]
        },
        {
          time: "21:15",
          description: "抵達台北桃園機場",
          type: "arrival",
          locations: [
            { name: "台北桃園機場", lat: 25.0797, lng: 121.2342 }
          ]
        }
      ],
      notes: "行程圓滿結束！記得準備入境台灣所需文件，歡迎回家！"
    }
  ],
  importantNotes: [
    "機票訂票代號：KCL2VN（請務必保存）",
    "出發前請確認護照有效期至少6個月以上",
    "2025年ETIAS(European Travel Information and Authorisation System)申請必須提前完成",
    "Swiss Travel Pass 15日票價：CHF 17,020，建議提前購買",
    "香港入境登記需提前一週辦理",
    "轉機時間充裕，但請注意登機門資訊",
    "建議購買旅遊保險涵蓋醫療和行程取消",
    "緊急聯絡電話：瑞士醫療急救：144，警察：117"
  ],
  // 主要城市/地點座標資料
  locations: {
    zurich: { lat: 47.3769, lng: 8.5417, name: "蘇黎世" },
    grindelwald: { lat: 46.62396, lng: 8.03601, name: "格林德瓦" },
    interlaken: { lat: 46.690556, lng: 7.869472, name: "因特拉肯" },
    luzern: { lat: 47.05048, lng: 8.30635, name: "盧塞恩" },
    zermatt: { lat: 46.0217, lng: 7.749, name: "采爾馬特" },
    montreux: { lat: 46.4312, lng: 6.9107, name: "蒙特勒" },
    chur: { lat: 46.8508, lng: 9.531, name: "庫爾" },
    augsburg: { lat: 48.3705, lng: 10.8978, name: "奧格斯堡" },
  },
  airports: {
    tpe: { lat: 25.0797, lng: 121.2342, name: "台北桃園機場", code: "TPE" },
    dxb: { lat: 25.2532, lng: 55.3657, name: "杜拜國際機場", code: "DXB" },
    zur: { lat: 47.451542, lng: 8.564572, name: "蘇黎世機場", code: "ZUR" },
    muc: { lat: 48.354336, lng: 11.787216, name: "慕尼黑機場", code: "MUC" }
  }
};

// 交通路線資料 (優化後)
const routes = [
    /* Day 0 ── TPE→DXB→ZUR (Flight) */
  {
    name: "Day 0: 台北→杜拜→蘇黎世 (航班)",
    type: "flight",
    color: "#0088CC",
    path: [
      [25.0797, 121.2342],  // TPE
      [25.2532,  55.3657],  // DXB
      [47.451542, 8.564572] // ZUR
    ]
  },
  {
    name: "Day 1: 蘇黎世→格林德瓦",
    type: "train",
    path: [
      [47.451542, 8.564572], // 蘇黎世機場
      [47.3769, 8.5417], // 蘇黎世主站
      [46.690556, 7.869472], // 因特拉肯東站
      [46.62396, 8.03601], // 格林德瓦
      [46.628001, 8.047025], // Hotel Gletscherblick
    ],
    color: "#3366CC",
  },
    /* Day 2 ── First 纜車 & 回程 */
  {
    name: "Day 2: First 纜車 & Adventure",
    type: "combined",
    color: "#55AAFF",
    path: [
      [46.628001, 8.047025], // Hotel
      [46.62396,  8.03601],  // Grindelwald Station
      [46.6564,   8.0484],   // First
      [46.628001, 8.047025]  // Hotel (return)
    ]
  },
  {
    name: "Day 3: 少女峰一日遊",
    type: "train",
    path: [
      [46.628001, 8.047025], // Hotel Gletscherblick
      [46.62396, 8.03601], // 格林德瓦站
      [46.5846, 7.9597], // 小夏戴克
      [46.537, 7.9621], // 少女峰 (更新經緯度)
      [46.5846, 7.9597], // 小夏戴克 (返程)
      [46.62396, 8.03601], // 格林德瓦
      [46.628001, 8.047025], // Hotel Gletscherblick
    ],
    color: "#00AA55", // 新增路線
  },
  {
    name: "Day 4: 格林德瓦→盧塞恩",
    type: "train",
    path: [
      [46.628001, 8.047025], // Hotel Gletscherblick (新增起點)
      [46.62396, 8.03601], // 格林德瓦 (更新經緯度)
      [46.690556, 7.869472], // 因特拉肯東站 (更新經緯度)
      [47.05048, 8.30635], // 盧塞恩 (更新經緯度)
      [47.046929, 8.301654], // Hotel Alpha Luzern (新增終點)
    ],
    color: "#3366CC",
  },
  {
    name: "Day 5: 皮拉圖斯山一日遊",
    type: "combined",
    path: [
      [47.046929, 8.301654], // Hotel Alpha Luzern
      [47.05048, 8.30635], // 盧塞恩站
      [47.0272, 8.278], // 克里恩斯
      [46.9794, 8.2528], // 皮拉圖斯山 (更新經緯度)
      [46.9652, 8.2853], // 阿爾普納赫施塔德
      [47.05048, 8.30635], // 盧塞恩
      [47.046929, 8.301654], // Hotel Alpha Luzern
    ],
    color: "#00AA55", // 新增路線
  },
  {
    name: "Day 6: 鐵力士山一日遊",
    type: "combined",
    path: [
      [47.046929, 8.301654], // Hotel Alpha Luzern
      [47.05048, 8.30635], // 盧塞恩站
      [46.8182, 8.4037], // 恩格爾貝格
      [46.7712, 8.4257], // 鐵力士山
      [46.8182, 8.4037], // 恩格爾貝格 (返程)
      [47.05048, 8.30635], // 盧塞恩
      [47.046929, 8.301654], // Hotel Alpha Luzern
    ],
    color: "#00AA55", // 新增路線
  },
  {
    name: "Day 7: 黃金列車路線",
    type: "train",
    path: [
      [47.046929, 8.301654], // Hotel Alpha Luzern (新增起點)
      [47.05048, 8.30635], // 盧塞恩 (更新經緯度)
      [46.690556, 7.869472], // 因特拉肯東站 (更新經緯度)
      [46.5534, 7.3778], // 茨魏西門
      [46.4312, 6.9107], // 蒙特勒
      [46.294, 7.8822], // 維斯普
      [46.0217, 7.749], // 采爾馬特
      [46.022442, 7.751421], // Hotel Cheminee (新增終點)
    ],
    color: "#FFCC00",
  },
  {
    name: "Day 8: 哥內格拉特一日遊",
    type: "train",
    path: [
      [46.022442, 7.751421], // Hotel Cheminee
      [46.0217, 7.749], // 采爾馬特站
      [46.0279, 7.7531], // 里菲爾貝格
      [45.9836, 7.7714], // 哥內格拉特
      [46.0279, 7.7531], // 里菲爾貝格 (返程)
      [46.0217, 7.749], // 采爾馬特
      [46.022442, 7.751421], // Hotel Cheminee
    ],
    color: "#00AA55", // 新增路線
  },
  {
    name: "Day 9: 冰川列車",
    type: "train",
    path: [
      [46.022442, 7.751421], // Hotel Cheminee (新增起點)
      [46.0217, 7.749], // 采爾馬特
      [46.294, 7.8822], // 維斯普 (新增中間站點)
      [46.8508, 9.531], // 庫爾
      [47.3769, 8.5417], // 蘇黎世
      [47.383347, 8.506269], // 蘇黎世西區公寓 (新增終點)
    ],
    color: "#CC0000",
  },
  {
    name: "Day 10: 萊茵瀑布及伊瑟特瓦爾德",
    type: "combined",
    path: [
      [47.383347, 8.506269], // 蘇黎世西區公寓
      [47.3769, 8.5417], // 蘇黎世主站
      [47.6957, 8.6379], // 沙夫豪森
      [47.6778, 8.6163], // 萊茵瀑布
      [47.6957, 8.6379], // 沙夫豪森 (返程)
      [47.3769, 8.5417], // 蘇黎世 (返程)
      [46.712087, 7.963030], // 伊瑟特瓦爾德 
      [47.383347, 8.506269], // 蘇黎世西區公寓
    ],
    color: "#FF9900", // 新增路線
  },
  {
    name: "Day 11: 蘇黎世市區一日遊",
    type: "city",
    path: [
      [47.383347, 8.506269], // 蘇黎世西區公寓
      [47.3723, 8.5386], // 班霍夫大街
      [47.3698, 8.5388], // 施普倫利巧克力店
      [47.3718, 8.5427], // Swiss Chuchi
      [47.3455, 8.5412], // 蘇黎世湖
      [47.3727, 8.5406], // 林登霍夫山丘
      [47.3727, 8.5412], // 利馬特河
      [47.383347, 8.506269], // 蘇黎世西區公寓
    ],
    color: "#FF33CC", // 新增路線
  },
  {
    name: "Day 12: 蘇黎世→奧格斯堡",
    type: "train",
    path: [
      [47.383347, 8.506269], // 蘇黎世西區公寓 (新增起點)
      [47.3769, 8.5417], // 蘇黎世主站
      [47.5952, 12.9856], // 國王湖 (新增中間站點)
      [48.3705, 10.8978], // 奧格斯堡
      [48.373598, 10.88899], // My Suite II (新增終點)
    ],
    color: "#3366CC",
  },
  {
    name: "Day 13: 奧格斯堡→諾德林根一日遊",
    type: "combined",
    path: [
      [48.373598, 10.88899], // My Suite II
      [48.3705, 10.8978], // 奧格斯堡站
      [48.8503, 10.4892], // 諾德林根
      [48.3705, 10.8978], // 奧格斯堡 (返程)
      [48.373598, 10.88899], // My Suite II
    ],
    color: "#33FFCC", // 新增路線
  },
  {
    name: "Day 14: 奧格斯堡→慕尼黑機場",
    type: "train",
    path: [
      [48.373598, 10.88899], // My Suite II
      [48.3705, 10.8978], // 奧格斯堡
      [48.354336, 11.787216], // 慕尼黑機場
    ],
    color: "#999999", // 新增路線
  },
    {
    name: "Day 15: 慕尼黑→杜拜 (航班)",
    type: "flight",
    color: "#AA77FF",
    path: [
      [48.354336, 11.787216], // MUC
      [25.2532,    55.3657]   // DXB
    ]
  },

  /* Day 16 ── DXB→TPE (Flight, Return) */
  {
    name: "Day 16: 杜拜→台北 (航班)",
    type: "flight",
    color: "#FF5588",
    path: [
      [25.2532,  55.3657],  // DXB
      [25.0797, 121.2342]   // TPE
    ]
  }
];

// 活動類型圖標 (FontAwesome 類型)
const activityIcons = {
  transport: "fa-train",
  sightseeing: "fa-mountain",
  activity: "fa-hiking",
  dining: "fa-utensils",
  accommodation: "fa-bed",
  departure: "fa-plane-departure",
  arrival: "fa-plane-arrival", 
  layover: "fa-clock",
  flight: "fa-plane"
};