import { singleElimination } from 'helpers/bracket'
const teams = _.shuffle([
  {
    id: 1,
    name: 'Team 1'
  },
  {
    id: 2,
    name: 'Team 2'
  },
  {
    id: 3,
    name: 'Team 3'
  },
  {
    id: 4,
    name: 'Team 4'
  },
  {
    id: 5,
    name: 'Team 5'
  },
  {
    id: 6,
    name: 'Team 6'
  },
  {
    id: 7,
    name: 'Team 7'
  },
  {
    id: 8,
    name: 'Team 8'
  },
  {
    id: 9,
    name: 'Team 9'
  },
  {
    id: 10,
    name: 'Team 10'
  }
])

export const aloneMatchData = singleElimination(teams)

export const listMatchData = {
  "id": "35b0745d-ef13-4255-8c40-c9daa95e4cc4",
  "scheduled": 1499551200000,
  "name": "B5",
  "sides": {
    "visitor": {
      "seed": {
        "sourceGame": {
          "id": "5dd25794-429b-4a1b-9926-bca93438a799",
          "scheduled": 1499547600000,
          "name": "B4",
          "sides": {
            "visitor": {
              "score": null,
              "seed": {
                "sourceGame": {
                  "id": "b43e7160-9a6a-4fef-8d6a-1dfb73473653",
                  "scheduled": 1499540400000,
                  "name": "B2",
                  "sides": {
                    "visitor": {
                      "score": null,
                      "seed": {
                        "sourceGame": null,
                        "rank": 1,
                        "displayName": "3rd place of A"
                      }
                    },
                    "home": {
                      "score": null,
                      "seed": {
                        "rank": 2,
                        "displayName": "2nd place of B"
                      }
                    }
                  }
                },
                "rank": 1,
                "displayName": "Winner of B2"
              }
            },
            "home": {
              "score": null,
              "seed": {
                "sourceGame": {
                  "id": "b43e7160-9a6a-4fef-8d6a-1dfb73473653123213",
                  "scheduled": 1499540400000,
                  "name": "B212",
                  "sides": {
                    "visitor": {
                      "score": null,
                      "seed": {
                        "rank": 3,
                        "displayName": "3rd place of A 123"
                      }
                    },
                    "home": {
                      "score": null,
                      "seed": {
                        "rank": 2,
                        "displayName": "2nd place of B 123"
                      }
                    }
                  }
                },
                "rank": 1,
                "displayName": "1st place of A"
              }
            }
          }
        },
        "rank": 1,
        "displayName": "Winner of B4"
      }
    },
    "home": {
      "seed": {
        "sourceGame": {
          "id": "b6e869cc-e6ad-4151-9186-5df828b45802",
          "scheduled": 1499547600000,
          "name": "B3",
          "sides": {
            "visitor": {
              "seed": {
                "sourceGame": {
                  "id": "20c907d1-52cf-4c99-bbf7-1860847cd77e",
                  "scheduled": 1499540400000,
                  "name": "B1",
                  "sides": {
                    "visitor": {
                      "team": {
                        "id": "3ecec587-9646-4050-b3b8-ff9ad8711f5e12",
                        "name": "Cochrane Fountain123123",
                      },
                      "score": {
                        "score": 21,
                        "notes": null
                      },
                      "seed": {
                        "sourceGame": null,
                        "rank": 3,
                        "displayName": "3rd place of B"
                      }
                    },
                    "home": {
                      "team": {
                        "id": "3ecec587-9646-4050-b3b8-ff9ad8711f5e",
                        "name": "Cochrane Fountain City Pirates",
                      },
                      "score": {
                        "score": 42,
                        "notes": null
                      },
                      "seed": {
                        "sourceGame": null,
                        "rank": 3,
                        "displayName": "3rd place of B1"
                      }
                    }
                  }
                },
                "rank": 1,
                "displayName": "Winner of B1"
              },
              "score": {
                "score": 42,
                "notes": null
              },
              "team": {
                "id": "3ecec587-9646-4050-b3b8",
                "name": "Cochrane Fountain",
              },
            },
            "home": {
              "team": {
                "id": "cf2cb3a0-3659-4bda-9a60-4ec9b373aa25",
                "name": "Westby Norsemen",
              },
              "score": {
                "score": 10,
                "notes": null
              },
              "seed": {
                "sourceGame": null,
                "rank": 2,
                "displayName": "1st place of B"
              }
            }
          }
        },
        "rank": 1,
        "displayName": "Winner of B3"
      }
    }
  }
}