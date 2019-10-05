export default [
    {
        _id: '5K4J3H3J',
        color: "13",
        started_at: '2019-10-03 15:23:44',
        progress: 0.0,
        stages: [
            {
                "name": "pesagem",
                "completed": true,
                "variables": [
                    {
                        "name": "peso",
                        "value": 12,
                        "unit": "kg"
                    }
                ]
            },
            {
                "name": "mistura",
                "completed": false,
                "variables": [
                    {
                        "name": "inergia",
                        "value": 12,
                        "unit": "sec"
                    },
                    {
                        "name": "termometro",
                        "value": 12,
                        "unit": "°C"
                    },
                    {
                        "name": "pressostato",
                        "value": 120,
                        "unit": "Pa"
                    },
                    {
                        "name": "fluxo",
                        "value": 12,
                        "unit": "m³/s"
                    }
                ]
            },
            {
                "name": "calandragem",
                "completed": false,
                "variables": [
                ]
            },
            {
                "name": "prensagem",
                "completed": false,
                "variables": [
                    {
                        "name": "pressostato",
                        "value": 120,
                        "unit": "Pa"
                    }
                ]
            },
            {
                "name": "secagem",
                "completed": false,
                "variables": []
            },
            {
                "name": "inspeção",
                "completed": false,
                "variables": [
                    {
                        "name": "resitencia",
                        "value": 12,
                        "unit": "N"
                    },
                    {
                        "name": "diametro",
                        "value": 12,
                        "unit": "cm"
                    },
                    {
                        "name": "reposição",
                        "value": 1,
                        "unit": "un"
                    },
                    {
                        "name": "comprimento",
                        "value": 12,
                        "unit": "cm"
                    },
                    {
                        "name": "flacking",
                        "value": 12,
                        "unit": "un"
                    },
                    {
                        "name": "umidade",
                        "value": 100,
                        "unit": "ppa"
                    }
                ]
            }
        ]
},
    {
        _id: 'H3J45J43',
        color: "47",
        started_at: '2019-10-03 15:23:44',
        progress: 0.0,
        stages: [
                    {
                        "name": "pesagem",
                        "completed": false,
                        "variables": [
                            {
                                "name": "peso",
                                "value": 12,
                                "unit": "kg"
                            }
                        ]
                    },
                    {
                        "name": "mistura",
                        "completed": false,
                        "variables": [
                            {
                                "name": "inergia",
                                "value": 12,
                                "unit": "sec"
                            },
                            {
                                "name": "termometro",
                                "value": 12,
                                "unit": "°C"
                            },
                            {
                                "name": "pressostato",
                                "value": 120,
                                "unit": "Pa"
                            },
                            {
                                "name": "fluxo",
                                "value": 12,
                                "unit": "m³/s"
                            }
                        ]
                    },
                    {
                        "name": "calandragem",
                        "completed": false,
                        "variables": [
                        ]
                    },
                    {
                        "name": "prensagem",
                        "completed": false,
                        "variables": [
                            {
                                "name": "pressostato",
                                "value": 120,
                                "unit": "Pa"
                            }
                        ]
                    },
                    {
                        "name": "secagem",
                        "completed": false,
                        "variables": []
                    },
                    {
                        "name": "inspeção",
                        "completed": false,
                        "variables": [
                            {
                                "name": "resitencia",
                                "value": 12,
                                "unit": "N"
                            },
                            {
                                "name": "diametro",
                                "value": 12,
                                "unit": "cm"
                            },
                            {
                                "name": "reposição",
                                "value": 1,
                                "unit": "un"
                            },
                            {
                                "name": "comprimento",
                                "value": 12,
                                "unit": "cm"
                            },
                            {
                                "name": "flacking",
                                "value": 12,
                                "unit": "un"
                            },
                            {
                                "umidade": "umidade",
                                "value": 100,
                                "unit": "ppa"
                            }
                        ]
                    }
                ]
    }
]

// {
//     "_id": "string",
//     "color": "string",
//     "started_at": "timestamp",
//     "progress": "string",
//     "stages": [
        // {
        //     "name": "pesagem",
        //     "completed": false,
        //     "variables": [
        //         {
        //             "name": "peso",
        //             "value": 12,
        //             "unit": "kg"
        //         }
        //     ]
        // }
//     ]
// }

// {
//     "color": "01",
//     "started_at": "timestamp",
//     "progress": "ta indo",
//     "stages": [
//         {
//             "name": "pesagem",
//             "completed": false,
//             "variables": [
//                 {
//                     "name": "peso",
//                     "value": 12,
//                     "unit": "kg"
//                 }
//             ]
//         },
//         {
//             "name": "mistura",
//             "completed": false,
//             "variables": [
//                 {
//                     "name": "inergia",
//                     "value": 12,
//                     "unit": "sec"
//                 },
//                 {
//                     "name": "termometro",
//                     "value": 12,
//                     "unit": "°C"
//                 },
//                 {
//                     "name": "pressostato",
//                     "value": 120,
//                     "unit": "Pa"
//                 },
//                 {
//                     "name": "fluxo",
//                     "value": 12,
//                     "unit": "m³/s"
//                 }
//             ]
//         },
//         {
//             "name": "calandragem",
//             "completed": false,
//             "variables": [
//             ]
//         },
//         {
//             "name": "prensagem",
//             "completed": false,
//             "variables": [
//                 {
//                     "name": "pressostato",
//                     "value": 120,
//                     "unit": "Pa"
//                 }
//             ]
//         },
//         {
//             "name": "secagem",
//             "completed": false,
//             "variables": []
//         },
//         {
//             "name": "inspeção",
//             "completed": false,
//             "variables": [
//                 {
//                     "name": "resitencia",
//                     "value": 12,
//                     "unit": "N"
//                 },
//                 {
//                     "name": "diametro",
//                     "value": 12,
//                     "unit": "cm"
//                 },
//                 {
//                     "name": "reposição",
//                     "value": 1,
//                     "unit": "un"
//                 },
//                 {
//                     "name": "comprimento",
//                     "value": 12,
//                     "unit": "cm"
//                 },
//                 {
//                     "name": "flacking",
//                     "value": 12,
//                     "unit": "un"
//                 },
//                 {
//                     "umidade": "umidade",
//                     "value": 100,
//                     "unit": "ppa"
//                 }
//             ]
//         }
//     ]
// }