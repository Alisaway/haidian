/* geo_layers.js — 由 build-staging/make_visual_data.py 生成，请勿手工编辑。
 *
 * 内容 = geometry/*.geojson 的逐字内嵌副本（未简化、未重排、未降精度）。
 * 内嵌原因：file:// 下浏览器禁止读取同目录 .json，而甲方规则禁止任何网络请求，
 * 因此内嵌是唯一可离线运行的方案。可直接与 geometry/ 下原件逐行 diff 核对。
 *
 * 原件 SHA-256（对文件原始字节；Windows: Get-FileHash -Algorithm SHA256）：
 *   geometry/site_boundary.geojson     66b8ab3db46dca00224c0662890a69c1bc0244902aa3390574f1ec20bc4348ff
 *   geometry/key_areas.geojson         566926817504a2938e081390879095fdc300a0df9328ddcbc6131b1e861718d3
 *   geometry/land_use.geojson          1901c3d6cf6c8097e5b821707499e4b5395bcefde08756e3e4bc5b733fc68a96
 *   geometry/green_space.geojson       fea3c2a93141607569e909eae6e996997a78b98c3e489b1ac6804d438423fd56
 *   geometry/public_space.geojson      e79a4644159576ecf5f7d38fdc2e8df84267cb1639ed820e0f962f6732ca25d0
 *   geometry/roads.geojson             ea3fdc2c238de30faea6bf9582ae4457b3f91fb799884c97f02081bb6201c5bc
 *   geometry/buildings.geojson         12134881779360c8e572fea3752cf13d9b904529e22b4c5ff682e16a37d9ffcd
 *   geometry/phasing.geojson           583889095b861a4a59d6211f4b4cc3c2d74b7b377bdc61f792dc6990e1a55444
 *   geometry/constraints.geojson       74513709b993c01001d721b90583f62194cb3b918af32fa5a16a6f4cd0aa350f
 * 注：manifest.json 登记的 sha256 使用 git blob 口径（hash of "blob <len>\0<content>"），
 * 与上面的裸文件 sha256 天然不同，两者都可独立复核。
 */
window.CA_GEO_DATA = {
  "generated_from": "submissions/wanghao198822/jingzhang-century-answer/geometry/",
  "crs": "EPSG:4326 (WGS84 lon/lat)",
  "source_sha256": {
      "geometry/site_boundary.geojson": "66b8ab3db46dca00224c0662890a69c1bc0244902aa3390574f1ec20bc4348ff",
      "geometry/key_areas.geojson": "566926817504a2938e081390879095fdc300a0df9328ddcbc6131b1e861718d3",
      "geometry/land_use.geojson": "1901c3d6cf6c8097e5b821707499e4b5395bcefde08756e3e4bc5b733fc68a96",
      "geometry/green_space.geojson": "fea3c2a93141607569e909eae6e996997a78b98c3e489b1ac6804d438423fd56",
      "geometry/public_space.geojson": "e79a4644159576ecf5f7d38fdc2e8df84267cb1639ed820e0f962f6732ca25d0",
      "geometry/roads.geojson": "ea3fdc2c238de30faea6bf9582ae4457b3f91fb799884c97f02081bb6201c5bc",
      "geometry/buildings.geojson": "12134881779360c8e572fea3752cf13d9b904529e22b4c5ff682e16a37d9ffcd",
      "geometry/phasing.geojson": "583889095b861a4a59d6211f4b4cc3c2d74b7b377bdc61f792dc6990e1a55444",
      "geometry/constraints.geojson": "74513709b993c01001d721b90583f62194cb3b918af32fa5a16a6f4cd0aa350f"
  },
  "layers": {
    "site_boundary": {
      "type": "FeatureCollection",
      "name": "site_boundary_scaffold",
      "features": [
        {
          "type": "Feature",
          "id": "SITE-001",
          "properties": {
            "id": "SITE-001",
            "layer": "SITE_BOUNDARY",
            "source_type": "agent_inferred_from_public_data",
            "confidence": "medium",
            "geometry_role": "provisional_constraint",
            "scope_id": "overall_design_area",
            "name_zh": "总体设计范围粗略替代边界",
            "official_boundary": false,
            "boundary_precision": "provisional_rough",
            "source_id": "DATA-SRC-PROVISIONAL-BOUNDARIES-20260605",
            "derived_from_source_ids": [
              "DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509"
            ],
            "source_title": "依据公告文字四至、约11.4平方公里面积约束和道路名称形成的临时粗略范围",
            "derivation_method": "以公告所述京张遗址公园周边1—2公里城市地区和产业区为走廊，以北五环路、学院路/西土城路、西直门外大街、大钟寺东路/荷清路等文字四至定位，并在EPSG:4548下校核至公告约11.4平方公里；道路名称仅用于粗略定位，不代表道路红线。",
            "area_sqm_declared": 11412825.386,
            "area_sqm_calculated": 11412825.386,
            "usage_note": "仅用于 AI agent 生成、展示和临时自检；不得作为 official redline、审批依据或精确面积复算依据。"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3407,
                  39.939
                ],
                [
                  116.3553,
                  39.939
                ],
                [
                  116.3553,
                  39.965
                ],
                [
                  116.3533,
                  39.99
                ],
                [
                  116.3553,
                  40.0265
                ],
                [
                  116.3427,
                  40.0265
                ],
                [
                  116.3417,
                  40.006
                ],
                [
                  116.3397,
                  39.975
                ],
                [
                  116.3407,
                  39.939
                ]
              ]
            ]
          }
        }
      ]
    },
    "key_areas": {
      "type": "FeatureCollection",
      "name": "key_areas_official",
      "features": [
        {
          "type": "Feature",
          "id": "PROV-KEY-001",
          "properties": {
            "id": "PROV-KEY-001",
            "layer": "KEY_AREA",
            "parent_scope_id": "key_detailed_design_area",
            "area_id": "zhongzhiyuan_ai_acceleration_area",
            "name_zh": "众智园AI自主创新加速区粗略范围",
            "source_type": "agent_inferred_from_public_data",
            "confidence": "medium",
            "geometry_role": "provisional_constraint",
            "official_boundary": false,
            "boundary_precision": "provisional_rough",
            "announced_area_sqm": 1921000,
            "area_sqm_calculated": 1929201.877,
            "source_id": "DATA-SRC-PROVISIONAL-BOUNDARIES-20260605",
            "derived_from_source_ids": [
              "DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509"
            ],
            "source_title": "依据公告重点片区名称、南北顺序、公告约面积和临时 SITE_BOUNDARY 形成的临时粗略范围",
            "derivation_method": "按公告自北向南第一处、众智园AI自主创新加速区、约192.1公顷及五环路/清河相关任务线索，在临时总体设计范围内粗略定位并校核面积；公告未给出四至，矩形边不得解释为地块或道路红线。",
            "usage_note": "仅用于 AI agent 生成、展示和临时自检；不得作为 official key-area polygon、审批依据或精确面积复算依据。"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.343,
                  40.0075
                ],
                [
                  116.354,
                  40.0075
                ],
                [
                  116.354,
                  40.026
                ],
                [
                  116.343,
                  40.026
                ],
                [
                  116.343,
                  40.0075
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "PROV-KEY-002",
          "properties": {
            "id": "PROV-KEY-002",
            "layer": "KEY_AREA",
            "parent_scope_id": "key_detailed_design_area",
            "area_id": "beijing_ai_origin_community",
            "name_zh": "北京AI原点社区粗略范围",
            "source_type": "agent_inferred_from_public_data",
            "confidence": "medium",
            "geometry_role": "provisional_constraint",
            "official_boundary": false,
            "boundary_precision": "provisional_rough",
            "announced_area_sqm": 1043000,
            "area_sqm_calculated": 1043236.909,
            "source_id": "DATA-SRC-PROVISIONAL-BOUNDARIES-20260605",
            "derived_from_source_ids": [
              "DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509"
            ],
            "source_title": "依据公告重点片区名称、南北顺序、公告约面积和临时 SITE_BOUNDARY 形成的临时粗略范围",
            "derivation_method": "按公告自北向南第二处、北京AI原点社区、约104.3公顷及五道口/清华东路西口相关任务线索，在临时总体设计范围内粗略定位并校核面积；公告未给出四至，矩形边不得解释为地块或道路红线。",
            "usage_note": "仅用于 AI agent 生成、展示和临时自检；不得作为 official key-area polygon、审批依据或精确面积复算依据。"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.342,
                  39.9835
                ],
                [
                  116.353,
                  39.9835
                ],
                [
                  116.353,
                  39.9935
                ],
                [
                  116.342,
                  39.9935
                ],
                [
                  116.342,
                  39.9835
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "PROV-KEY-003",
          "properties": {
            "id": "PROV-KEY-003",
            "layer": "KEY_AREA",
            "parent_scope_id": "key_detailed_design_area",
            "area_id": "dazhongsi_ai_industry_cluster",
            "name_zh": "大钟寺AI产业聚集区粗略范围",
            "source_type": "agent_inferred_from_public_data",
            "confidence": "medium",
            "geometry_role": "provisional_constraint",
            "official_boundary": false,
            "boundary_precision": "provisional_rough",
            "announced_area_sqm": 720000,
            "area_sqm_calculated": 720454.221,
            "source_id": "DATA-SRC-PROVISIONAL-BOUNDARIES-20260605",
            "derived_from_source_ids": [
              "DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509"
            ],
            "source_title": "依据公告重点片区名称、南北顺序、公告约面积和临时 SITE_BOUNDARY 形成的临时粗略范围",
            "derivation_method": "按公告自北向南第三处、大钟寺AI产业聚集区、约72.0公顷及大钟寺站相关任务线索，在临时总体设计范围内粗略定位并校核面积；公告未给出四至，矩形边不得解释为地块或道路红线。",
            "usage_note": "仅用于 AI agent 生成、展示和临时自检；不得作为 official key-area polygon、审批依据或精确面积复算依据。"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.342,
                  39.944
                ],
                [
                  116.355,
                  39.944
                ],
                [
                  116.355,
                  39.94984
                ],
                [
                  116.342,
                  39.94984
                ],
                [
                  116.342,
                  39.944
                ]
              ]
            ]
          }
        }
      ]
    },
    "land_use": {
      "type": "FeatureCollection",
      "name": "land_use_topology_partition",
      "features": [
        {
          "type": "Feature",
          "id": "LU-001",
          "properties": {
            "id": "LU-001",
            "layer": "LAND_USE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "1401",
            "usage_note_zh": "概念性用地布局建议（参考方案），仅表达结构意向，待专业团队结合控规、现状权属与文物保护要求深化核定；不构成用地批准依据，边线不代表道路红线或地块权属边界；既有校园、居住社区与商业设施以现状延续为前提，本图层不含拆改留结论。",
            "name_zh": "京张遗址公园绿廊（九公里应答长卷主脊段，概念）",
            "area_sqm_declared": 2589251.89
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.344507419,
                  39.939000177
                ],
                [
                  116.343670695,
                  40.026500049
                ],
                [
                  116.346792584,
                  40.02650015
                ],
                [
                  116.347625328,
                  39.939000229
                ],
                [
                  116.344507419,
                  39.939000177
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "LU-002",
          "properties": {
            "id": "LU-002",
            "layer": "LAND_USE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "0803",
            "usage_note_zh": "概念性用地布局建议（参考方案），仅表达结构意向，待专业团队结合控规、现状权属与文物保护要求深化核定；不构成用地批准依据，边线不代表道路红线或地块权属边界；既有校园、居住社区与商业设施以现状延续为前提，本图层不含拆改留结论。",
            "name_zh": "大钟寺文化片区（鸣钟之门西翼，概念）",
            "area_sqm_declared": 400735.683
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3407,
                  39.939
                ],
                [
                  116.340400143,
                  39.949799822
                ],
                [
                  116.344404128,
                  39.949822534
                ],
                [
                  116.344507419,
                  39.939000177
                ],
                [
                  116.3407,
                  39.939
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "LU-003",
          "properties": {
            "id": "LU-003",
            "layer": "LAND_USE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "0901",
            "usage_note_zh": "概念性用地布局建议（参考方案），仅表达结构意向，待专业团队结合控规、现状权属与文物保护要求深化核定；不构成用地批准依据，边线不代表道路红线或地块权属边界；既有校园、居住社区与商业设施以现状延续为前提，本图层不含拆改留结论。",
            "name_zh": "大钟寺商业活力片区（东翼更新界面，概念）",
            "area_sqm_declared": 796407.677
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3553,
                  39.939
                ],
                [
                  116.347625328,
                  39.939000229
                ],
                [
                  116.347522362,
                  39.949840126
                ],
                [
                  116.355300016,
                  39.949883639
                ],
                [
                  116.3553,
                  39.939
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "LU-004",
          "properties": {
            "id": "LU-004",
            "layer": "LAND_USE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "0802",
            "usage_note_zh": "概念性用地布局建议（参考方案），仅表达结构意向，待专业团队结合控规、现状权属与文物保护要求深化核定；不构成用地批准依据，边线不代表道路红线或地块权属边界；既有校园、居住社区与商业设施以现状延续为前提，本图层不含拆改留结论。",
            "name_zh": "学院南路科研创新带（南问段西翼，概念）",
            "area_sqm_declared": 1345239.039
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3397,
                  39.975
                ],
                [
                  116.340245576,
                  39.983458934
                ],
                [
                  116.344082529,
                  39.983480711
                ],
                [
                  116.344404128,
                  39.949822534
                ],
                [
                  116.340400143,
                  39.949799822
                ],
                [
                  116.3397,
                  39.975
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "LU-005",
          "properties": {
            "id": "LU-005",
            "layer": "LAND_USE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "0701",
            "usage_note_zh": "概念性用地布局建议（参考方案），仅表达结构意向，待专业团队结合控规、现状权属与文物保护要求深化核定；不构成用地批准依据，边线不代表道路红线或地块权属边界；既有校园、居住社区与商业设施以现状延续为前提，本图层不含拆改留结论。",
            "name_zh": "东侧既有居住社区片区南段（应答门渗透界面，概念）",
            "area_sqm_declared": 2404339.099
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3553,
                  39.965
                ],
                [
                  116.355300016,
                  39.949883639
                ],
                [
                  116.347522362,
                  39.949840126
                ],
                [
                  116.347202293,
                  39.983498324
                ],
                [
                  116.353817321,
                  39.983535391
                ],
                [
                  116.3553,
                  39.965
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "LU-006",
          "properties": {
            "id": "LU-006",
            "layer": "LAND_USE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "0804",
            "usage_note_zh": "概念性用地布局建议（参考方案），仅表达结构意向，待专业团队结合控规、现状权属与文物保护要求深化核定；不构成用地批准依据，边线不代表道路红线或地块权属边界；既有校园、居住社区与商业设施以现状延续为前提，本图层不含拆改留结论。",
            "name_zh": "高校科教界面片区（清华园车站西翼，概念）",
            "area_sqm_declared": 328759.955
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.34089094,
                  39.993462604
                ],
                [
                  116.343986882,
                  39.993480168
                ],
                [
                  116.344082529,
                  39.983480711
                ],
                [
                  116.340245576,
                  39.983458934
                ],
                [
                  116.34089094,
                  39.993462604
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "LU-007",
          "properties": {
            "id": "LU-007",
            "layer": "LAND_USE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "0902",
            "usage_note_zh": "概念性用地布局建议（参考方案），仅表达结构意向，待专业团队结合控规、现状权属与文物保护要求深化核定；不构成用地批准依据，边线不代表道路红线或地块权属边界；既有校园、居住社区与商业设施以现状延续为前提，本图层不含拆改留结论。",
            "name_zh": "学院路知识经济商务带（中答段东翼，概念）",
            "area_sqm_declared": 601926.438
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3533,
                  39.99
                ],
                [
                  116.353817321,
                  39.983535391
                ],
                [
                  116.347202293,
                  39.983498324
                ],
                [
                  116.3471071,
                  39.993497787
                ],
                [
                  116.353493539,
                  39.993533588
                ],
                [
                  116.3533,
                  39.99
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "LU-008",
          "properties": {
            "id": "LU-008",
            "layer": "LAND_USE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "0802",
            "usage_note_zh": "概念性用地布局建议（参考方案），仅表达结构意向，待专业团队结合控规、现状权属与文物保护要求深化核定；不构成用地批准依据，边线不代表道路红线或地块权属边界；既有校园、居住社区与商业设施以现状延续为前提，本图层不含拆改留结论。",
            "name_zh": "西翼科研创新带北段（面向众智园，概念）",
            "area_sqm_declared": 617522.586
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3417,
                  40.006
                ],
                [
                  116.3427,
                  40.0265
                ],
                [
                  116.343670695,
                  40.026500049
                ],
                [
                  116.343986882,
                  39.993480168
                ],
                [
                  116.34089094,
                  39.993462604
                ],
                [
                  116.3417,
                  40.006
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "LU-009",
          "properties": {
            "id": "LU-009",
            "layer": "LAND_USE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "0701",
            "usage_note_zh": "概念性用地布局建议（参考方案），仅表达结构意向，待专业团队结合控规、现状权属与文物保护要求深化核定；不构成用地批准依据，边线不代表道路红线或地块权属边界；既有校园、居住社区与商业设施以现状延续为前提，本图层不含拆改留结论。",
            "name_zh": "东侧既有居住社区片区北段（概念）",
            "area_sqm_declared": 907585.397
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.353493539,
                  39.993533588
                ],
                [
                  116.3471071,
                  39.993497787
                ],
                [
                  116.346973749,
                  40.007497036
                ],
                [
                  116.354260744,
                  40.007537868
                ],
                [
                  116.353493539,
                  39.993533588
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "LU-010",
          "properties": {
            "id": "LU-010",
            "layer": "LAND_USE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "16",
            "usage_note_zh": "概念性用地布局建议（参考方案），仅表达结构意向，待专业团队结合控规、现状权属与文物保护要求深化核定；不构成用地批准依据，边线不代表道路红线或地块权属边界；既有校园、居住社区与商业设施以现状延续为前提，本图层不含拆改留结论。",
            "name_zh": "众智园弹性留白用地（北跃段·面向未来之问，概念）",
            "area_sqm_declared": 1421057.362
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3553,
                  40.0265
                ],
                [
                  116.354260744,
                  40.007537868
                ],
                [
                  116.346973749,
                  40.007497036
                ],
                [
                  116.346792584,
                  40.02650015
                ],
                [
                  116.3553,
                  40.0265
                ]
              ]
            ]
          }
        }
      ]
    },
    "green_space": {
      "type": "FeatureCollection",
      "name": "green_space_design",
      "features": [
        {
          "type": "Feature",
          "id": "GREEN-001",
          "properties": {
            "id": "GREEN-001",
            "layer": "GREEN_SPACE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "1401",
            "usage_note_zh": "概念性绿地深化建议（参考方案），待专业团队结合公园既有设计与蓝绿系统深化；不构成工程结论。",
            "name_zh": "公园绿廊南段（南问段·鸣钟之门绿地界面，概念）",
            "area_sqm_declared": 1316500.098
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.344082529,
                  39.983480711
                ],
                [
                  116.347202293,
                  39.983498324
                ],
                [
                  116.347625328,
                  39.939000229
                ],
                [
                  116.344507419,
                  39.939000177
                ],
                [
                  116.344082529,
                  39.983480711
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "GREEN-002",
          "properties": {
            "id": "GREEN-002",
            "layer": "GREEN_SPACE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "1401",
            "usage_note_zh": "概念性绿地深化建议（参考方案），待专业团队结合公园既有设计与蓝绿系统深化；不构成工程结论。",
            "name_zh": "公园绿廊中段（应答原点段·道钉带核心界面，概念）",
            "area_sqm_declared": 710158.967
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.343852894,
                  40.007479408
                ],
                [
                  116.346973749,
                  40.007497036
                ],
                [
                  116.347202293,
                  39.983498324
                ],
                [
                  116.344082529,
                  39.983480711
                ],
                [
                  116.343852894,
                  40.007479408
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "GREEN-003",
          "properties": {
            "id": "GREEN-003",
            "layer": "GREEN_SPACE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "1401",
            "usage_note_zh": "概念性绿地深化建议（参考方案），待专业团队结合公园既有设计与蓝绿系统深化；不构成工程结论。",
            "name_zh": "公园绿廊北段（北跃段·人字之跃与清河衔接，概念）",
            "area_sqm_declared": 562593.053
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.343670695,
                  40.026500049
                ],
                [
                  116.346792584,
                  40.02650015
                ],
                [
                  116.346973749,
                  40.007497036
                ],
                [
                  116.343852894,
                  40.007479408
                ],
                [
                  116.343670695,
                  40.026500049
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "GREEN-004",
          "properties": {
            "id": "GREEN-004",
            "layer": "GREEN_SPACE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "land_use_code": "1402",
            "usage_note_zh": "概念性绿地深化建议（参考方案），待专业团队结合公园既有设计与蓝绿系统深化；不构成工程结论。",
            "name_zh": "清河蓝绿空间概念协调带（跨地块生态界面示意）",
            "area_sqm_declared": 268014.191
          },
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": [
              [
                [
                  [
                    116.343670695,
                    40.026500049
                  ],
                  [
                    116.34369965,
                    40.023478538
                  ],
                  [
                    116.342552262,
                    40.023472034
                  ],
                  [
                    116.3427,
                    40.0265
                  ],
                  [
                    116.343670695,
                    40.026500049
                  ]
                ]
              ],
              [
                [
                  [
                    116.3553,
                    40.0265
                  ],
                  [
                    116.355137889,
                    40.023542756
                  ],
                  [
                    116.346821234,
                    40.023496176
                  ],
                  [
                    116.346792584,
                    40.02650015
                  ],
                  [
                    116.3553,
                    40.0265
                  ]
                ]
              ]
            ]
          }
        }
      ]
    },
    "public_space": {
     "type": "FeatureCollection",
     "name": "public_space_design",
     "features": [
      {
       "type": "Feature",
       "id": "PUBLIC-001",
       "properties": {
        "id": "PUBLIC-001",
        "layer": "PUBLIC_SPACE",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "usage_note_zh": "概念性公共空间建议（参考方案），选址与规模待专业团队深化；不构成工程或审批结论。 应答钟为新铸概念构想，与大钟寺古钟博物馆为文化呼应关系，不涉及文物本体及其保护范围。",
        "name_zh": "钟声广场（大钟寺·应答钟概念广场与四象限步行缝合界面）",
        "area_sqm_declared": 10000.0
       },
       "geometry": {
        "type": "Polygon",
        "coordinates": [
         [
          [
           116.34799013016958,
           39.94398986817046
          ],
          [
           116.34798232640468,
           39.944811972354515
          ],
          [
           116.34926402685878,
           39.944819173621426
          ],
          [
           116.3492718155369,
           39.94399706896292
          ],
          [
           116.34799013016958,
           39.94398986817046
          ]
         ]
        ]
       }
      },
      {
       "type": "Feature",
       "id": "PUBLIC-002",
       "properties": {
        "id": "PUBLIC-002",
        "layer": "PUBLIC_SPACE",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "usage_note_zh": "概念性公共空间建议（参考方案），选址与规模待专业团队深化；不构成工程或审批结论。 清华园车站文保范围GIS缺失，本选点仅为待文物部门协商的概念选点，不得视为已确定落位。",
        "name_zh": "清华园车站站前纪念广场与零公里桩（概念选点，待文物部门协商）",
        "area_sqm_declared": 6000.0
       },
       "geometry": {
        "type": "Polygon",
        "coordinates": [
         [
          [
           116.34270658848898,
           39.98816373514023
          ],
          [
           116.34270066210436,
           39.98878206697725
          ],
          [
           116.34372376014642,
           39.988787864396734
          ],
          [
           116.34372967710361,
           39.988169532635744
          ],
          [
           116.34270658848898,
           39.98816373514023
          ]
         ]
        ]
       }
      },
      {
       "type": "Feature",
       "id": "PUBLIC-003",
       "properties": {
        "id": "PUBLIC-003",
        "layer": "PUBLIC_SPACE",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "usage_note_zh": "概念性公共空间建议（参考方案），选址与规模待专业团队深化；不构成工程或审批结论。 跨五环人字天桥为概念节点，不含桥梁工程结论。",
        "name_zh": "人字天桥北桥头·未来之问广场（概念节点）",
        "area_sqm_declared": 8000.0
       },
       "geometry": {
        "type": "Polygon",
        "coordinates": [
         [
          [
           116.34716308221473,
           40.01662356114947
          ],
          [
           116.34715568567468,
           40.01739974487337
          ],
          [
           116.34824284397139,
           40.017405864923504
          ],
          [
           116.34825022820753,
           40.016629680621605
          ],
          [
           116.34716308221473,
           40.01662356114947
          ]
         ]
        ]
       }
      },
      {
       "type": "Feature",
       "id": "PUBLIC-004",
       "properties": {
        "id": "PUBLIC-004",
        "layer": "PUBLIC_SPACE",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "usage_note_zh": "概念性公共空间建议（参考方案），选址与规模待专业团队深化；不构成工程或审批结论。 应答门依托遗址公园二期规划出入口表述，以实际建成为准。",
        "name_zh": "应答门社区微广场示范点（东翼·一页考卷界面，概念）",
        "area_sqm_declared": 4200.0
       },
       "geometry": {
        "type": "Polygon",
        "coordinates": [
         [
          [
           116.349764274,
           39.966412563
          ],
          [
           116.349759154,
           39.966952903000006
          ],
          [
           116.350578438,
           39.96695749599999
          ],
          [
           116.35058355100001,
           39.96641715599999
          ],
          [
           116.349764274,
           39.966412563
          ]
         ]
        ]
       }
      },
      {
       "type": "Feature",
       "id": "PUBLIC-005",
       "properties": {
        "id": "PUBLIC-005",
        "layer": "PUBLIC_SPACE",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "usage_note_zh": "概念性公共空间建议（参考方案），选址与规模待专业团队深化；不构成工程或审批结论。",
        "name_zh": "公园东翼慢行公共活动界面带（要素服务驿站与路演界面概念布点带）",
        "area_sqm_declared": 192069.1
       },
       "geometry": {
        "type": "Polygon",
        "coordinates": [
         [
          [
           116.3476978787216,
           39.949841113700764
          ],
          [
           116.34714941350128,
           40.007498025709744
          ],
          [
           116.34750074250243,
           40.00750000408914
          ],
          [
           116.34804891222261,
           39.949843088096145
          ],
          [
           116.3476978787216,
           39.949841113700764
          ]
         ]
        ]
       }
      }
     ]
    },
    "roads": {
     "type": "FeatureCollection",
     "name": "roads_concept_design",
     "features": [
      {
       "type": "Feature",
       "id": "ROAD-001",
       "properties": {
        "id": "ROAD-001",
        "layer": "ROAD_CENTERLINE",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "road_class": "greenway",
        "concept": true,
        "usage_note_zh": "概念线（参考方案），仅表达联通意向，不代表道路红线、断面或工程结论，待专业团队深化。",
        "name_zh": "九公里应答长卷慢行主线（概念线）"
       },
       "geometry": {
        "type": "LineString",
        "coordinates": [
         [
          116.346066116,
          39.939027232
         ],
         [
          116.345231898,
          40.026473093
         ]
        ]
       }
      },
      {
       "type": "Feature",
       "id": "ROAD-002",
       "properties": {
        "id": "ROAD-002",
        "layer": "ROAD_CENTERLINE",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "road_class": "cycleway",
        "concept": true,
        "usage_note_zh": "概念线（参考方案），仅表达联通意向，不代表道路红线、断面或工程结论，待专业团队深化。 与无障碍坡道一套改造两用为概念机制，测试验证场景建议选址于已开放的一期建成段。",
        "name_zh": "低速物流机器人测试通道（概念线·建议先行于已开放建成段验证）"
       },
       "geometry": {
        "type": "LineString",
        "coordinates": [
         [
          116.34702669,
          39.983497335
         ],
         [
          116.346798085,
          40.007496046
         ]
        ]
       }
      },
      {
       "type": "Feature",
       "id": "ROAD-003",
       "properties": {
        "id": "ROAD-003",
        "layer": "ROAD_CENTERLINE",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "road_class": "pedestrian",
        "concept": true,
        "usage_note_zh": "概念线（参考方案），仅表达联通意向，不代表道路红线、断面或工程结论，待专业团队深化。",
        "name_zh": "应答门东西缝合慢行连线·鸣钟之门段（概念示范线）"
       },
       "geometry": {
        "type": "LineString",
        "coordinates": [
         [
          116.34058633,
          39.944359067
         ],
         [
          116.355264909,
          39.944441627
         ]
        ]
       }
      },
      {
       "type": "Feature",
       "id": "ROAD-004",
       "properties": {
        "id": "ROAD-004",
        "layer": "ROAD_CENTERLINE",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "road_class": "pedestrian",
        "concept": true,
        "usage_note_zh": "概念线（参考方案），仅表达联通意向，不代表道路红线、断面或工程结论，待专业团队深化。",
        "name_zh": "应答门东西缝合慢行连线·应答原点段（概念示范线）"
       },
       "geometry": {
        "type": "LineString",
        "coordinates": [
         [
          116.340603417,
          39.988460972
         ],
         [
          116.353382216,
          39.988532968
         ]
        ]
       }
      },
      {
       "type": "Feature",
       "id": "ROAD-005",
       "properties": {
        "id": "ROAD-005",
        "layer": "ROAD_CENTERLINE",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "road_class": "pedestrian",
        "concept": true,
        "usage_note_zh": "概念线（参考方案），仅表达联通意向，不代表道路红线、断面或工程结论，待专业团队深化。 跨五环人字天桥为概念节点，不含工程结论。",
        "name_zh": "应答门东西缝合慢行连线·人字之跃段（指向跨五环概念节点方向）"
       },
       "geometry": {
        "type": "LineString",
        "coordinates": [
         [
          116.342270904,
          40.016984011
         ],
         [
          116.354747069,
          40.017054151
         ]
        ]
       }
      }
     ]
    },
    "buildings": {
     "type": "FeatureCollection",
     "name": "building_footprints_design",
     "features": [
      {
       "type": "Feature",
       "id": "BLDG-001",
       "properties": {
        "id": "BLDG-001",
        "layer": "BUILDING_FOOTPRINT",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "building_type": "cultural",
        "usage_note_zh": "概念性小型构筑物基底示意（参考方案），体量与选址待专业团队深化；不含建筑高度与工程结论。",
        "name_zh": "应答钟阁概念基底（钟声广场内）",
        "area_sqm_declared": 1599.999,
        "usage_note": "概念建筑体量示意，功能见 name_zh；原分类意向：civic_pavilion_concept"
       },
       "geometry": {
        "type": "Polygon",
        "coordinates": [
         [
          [
           116.348391362,
           39.944583322
          ],
          [
           116.348387944,
           39.94494355
          ],
          [
           116.348855956,
           39.944946179
          ],
          [
           116.348859371,
           39.944585951
          ],
          [
           116.348391362,
           39.944583322
          ]
         ]
        ]
       }
      },
      {
       "type": "Feature",
       "id": "BLDG-002",
       "properties": {
        "id": "BLDG-002",
        "layer": "BUILDING_FOOTPRINT",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "building_type": "cultural",
        "usage_note_zh": "概念性小型构筑物基底示意（参考方案），体量与选址待专业团队深化；不含建筑高度与工程结论。",
        "name_zh": "城市进化档案馆概念装置基底（道钉带旁）",
        "area_sqm_declared": 900.0,
        "usage_note": "概念建筑体量示意，功能见 name_zh；原分类意向：archive_pavilion_concept"
       },
       "geometry": {
        "type": "Polygon",
        "coordinates": [
         [
          [
           116.347273065,
           39.988363633
          ],
          [
           116.347270494,
           39.988633802
          ],
          [
           116.347621726,
           39.988635779
          ],
          [
           116.347624296,
           39.98836561
          ],
          [
           116.347273065,
           39.988363633
          ]
         ]
        ]
       }
      },
      {
       "type": "Feature",
       "id": "BLDG-003",
       "properties": {
        "id": "BLDG-003",
        "layer": "BUILDING_FOOTPRINT",
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "building_type": "community_service",
        "usage_note_zh": "概念性小型构筑物基底示意（参考方案），体量与选址待专业团队深化；不含建筑高度与工程结论。",
        "name_zh": "要素服务驿站示范点基底（东翼低效空间概念布点）",
        "area_sqm_declared": 625.0,
        "usage_note": "概念建筑体量示意，功能见 name_zh；原分类意向：service_station_concept"
       },
       "geometry": {
        "type": "Polygon",
        "coordinates": [
         [
          [
           116.347568285,
           39.966557832
          ],
          [
           116.347566144,
           39.966782973
          ],
          [
           116.347858745,
           39.96678462
          ],
          [
           116.347860884,
           39.966559478
          ],
          [
           116.347568285,
           39.966557832
          ]
         ]
        ]
       }
      }
     ]
    },
    "phasing": {
      "type": "FeatureCollection",
      "name": "phasing_design",
      "features": [
        {
          "type": "Feature",
          "id": "PHASE-001",
          "properties": {
            "id": "PHASE-001",
            "layer": "PHASE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "phase": "phase_1",
            "usage_note_zh": "概念性时序建议（参考方案），不构成政府承诺或实施计划；实际时序以主管部门与专业团队确定为准。",
            "name_zh": "一期·南问段（鸣钟之门与既有界面场景启动，概念时序建议）",
            "area_sqm_declared": 6263221.578
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3553,
                  39.965
                ],
                [
                  116.3553,
                  39.939
                ],
                [
                  116.3407,
                  39.939
                ],
                [
                  116.3397,
                  39.975
                ],
                [
                  116.340245576,
                  39.983458934
                ],
                [
                  116.353817321,
                  39.983535391
                ],
                [
                  116.3553,
                  39.965
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "PHASE-002",
          "properties": {
            "id": "PHASE-002",
            "layer": "PHASE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "phase": "phase_2",
            "usage_note_zh": "概念性时序建议（参考方案），不构成政府承诺或实施计划；实际时序以主管部门与专业团队确定为准。",
            "name_zh": "二期·中答段（应答原点与道钉带核心段，概念时序建议）",
            "area_sqm_declared": 2890709.805
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3533,
                  39.99
                ],
                [
                  116.353817321,
                  39.983535391
                ],
                [
                  116.340245576,
                  39.983458934
                ],
                [
                  116.3417,
                  40.006
                ],
                [
                  116.341771573,
                  40.007467606
                ],
                [
                  116.354260744,
                  40.007537868
                ],
                [
                  116.3533,
                  39.99
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "id": "PHASE-003",
          "properties": {
            "id": "PHASE-003",
            "layer": "PHASE",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "phase": "phase_3",
            "usage_note_zh": "概念性时序建议（参考方案），不构成政府承诺或实施计划；实际时序以主管部门与专业团队确定为准。",
            "name_zh": "三期·北跃段（人字之跃与清河蓝绿衔接，概念时序建议）",
            "area_sqm_declared": 2258894.016
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  116.3427,
                  40.0265
                ],
                [
                  116.3553,
                  40.0265
                ],
                [
                  116.354260744,
                  40.007537868
                ],
                [
                  116.341771573,
                  40.007467606
                ],
                [
                  116.3427,
                  40.0265
                ]
              ]
            ]
          }
        }
      ]
    },
    "constraints": {
      "type": "FeatureCollection",
      "name": "constraints_scaffold",
      "features": [],
      "data_gap": {
        "status": "official_constraint_geometry_unavailable",
        "declared_by": "scripts/scaffold_ai_submission.py",
        "assumption_ids": [
          "A-CONTROLS-001"
        ],
        "missing_layers": [
          "REGULATORY_CONTROL",
          "HERITAGE_PROTECTION",
          "PARCEL",
          "EXISTING_PRIMARY_ROAD",
          "EXISTING_RAIL",
          "EXISTING_WATER"
        ],
        "note_zh": "本图层刻意保持空集合。控规控制线、文物保护范围与建设控制地带、道路红线、权属地块、轨道与蓝线均属锁定图层，公开场地包中目前没有可引用的官方几何来源。缺口按 assumption A-CONTROLS-001 登记；取得官方或已清权几何前，不得以推定线条冒充 official_constraint，空集合优于编造。",
        "note_en": "This layer is intentionally an empty set. Regulatory control lines, heritage protection and construction-control zones, road redlines, cadastral parcels, rail and blue lines are locked layers with no citable official geometry in the public site package. The gap is registered as assumption A-CONTROLS-001; until official or cleared geometry is available, inferred lines must not be presented as an official_constraint - an empty set is preferred over fabrication."
      }
    }
  }
};
