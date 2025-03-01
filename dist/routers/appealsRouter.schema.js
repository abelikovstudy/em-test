"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swLoginRoute = void 0;
const AppealCreate = {
    "summary": "Создает обращение.",
    "tags": [
        "1) Создать обращение"
    ],
    "parameters": [
        {
            "name": "title",
            "in": "body",
            "schema": {
                "type": "string",
                "example": `Создать сайт`
            },
            "required": true
        },
        {
            "name": "details",
            "in": "body",
            "schema": {
                "type": "string",
                "example": `СРОЧНО!!!`
            },
            "required": true
        }
    ],
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "string",
                    "example": { "title": "Создать сайт", "details": "СРОЧНО!!!" }
                }
            }
        }
    },
    "responses": {
        "400": {
            "description": "Request body was empty."
        },
        "422": {
            "description": "Request body incomplete."
        },
        "409": {
            "description": "Given appeal already exists."
        },
        "200": {
            "description": "Your appeal: XXXX was created at YYYY-MM-DD."
        }
    }
};
const AppealProceed = {
    "summary": "Берет обращение в работу.",
    "tags": [
        "2) Взять обращение в работу"
    ],
    "parameters": [
        {
            "name": "title",
            "in": "body",
            "schema": {
                "type": "string",
                "example": `Создать сайт`
            },
            "required": true
        }
    ],
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "string",
                    "example": { "title": "Создать сайт" }
                }
            }
        }
    },
    "responses": {
        "400": {
            "description": "Request body was empty."
        },
        "422": {
            "description": "Request body incomplete."
        },
        "404": {
            "description": "Given appeal does not exists."
        },
        "200": {
            "description": "Your appeal: XXXX was status was updated at YYYY-MM-DD to PROCESSING."
        }
    }
};
const AppealClose = {
    "summary": "Завершает обработку обращения",
    "tags": [
        "3) Завершить обработку обращения"
    ],
    "parameters": [
        {
            "name": "title",
            "in": "body",
            "schema": {
                "type": "string",
                "example": `Создать сайт`
            },
            "required": true
        },
        {
            "name": "solution",
            "in": "body",
            "schema": {
                "type": "string",
                "example": `Ваш сайт готов по ссылке ...`
            },
            "required": true
        }
    ],
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "string",
                    "example": { "title": "Создать сайт", "solution": "Ваш сайт готов по ссылке ..." }
                }
            }
        }
    },
    "responses": {
        "400": {
            "description": "Request body was empty."
        },
        "422": {
            "description": "Request body incomplete."
        },
        "404": {
            "description": "Given appeal does not exists."
        },
        "200": {
            "description": "Appeal: XXXX was closed on YYYY-MM-DD."
        }
    }
};
const AppealCancel = {
    "summary": "Отменяет обращение",
    "tags": [
        "4) Отмена обращения"
    ],
    "parameters": [
        {
            "name": "title",
            "in": "body",
            "schema": {
                "type": "string",
                "example": `Создать сайт`
            },
            "required": true
        },
        {
            "name": "cancel",
            "in": "body",
            "schema": {
                "type": "string",
                "example": `Решить вашу проблему не выйдет ...`
            },
            "required": true
        }
    ],
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "type": "string",
                    "example": { "title": "Создать сайт", "cancel": "Решить вашу проблему не выйдет ..." }
                }
            }
        }
    },
    "responses": {
        "400": {
            "description": "Request body was empty."
        },
        "422": {
            "description": "Request body incomplete."
        },
        "404": {
            "description": "Given appeal does not exists."
        },
        "200": {
            "description": "Appeal: XXXX was closed on YYYY-MM-DD."
        }
    }
};
const AppealList = {
    "summary": "Получить список обращений",
    "tags": [
        "5)Получить список обращений с возможность фильтрации по конкретной дате и по диапазону дат."
    ],
    "parameters": [
        {
            "name": "date",
            "in": "querry",
            "schema": {
                "type": "string",
                "example": `2025-02-20`
            },
            "required": true
        },
        {
            "name": "dateRangeStart",
            "in": "querry",
            "schema": {
                "type": "string",
                "example": `2020-01-01`
            },
            "required": true
        },
        {
            "name": "dateRangeEnd",
            "in": "querry",
            "schema": {
                "type": "string",
                "example": `2025-12-31`
            },
            "required": true
        },
        {
            "name": "range",
            "in": "querry",
            "schema": {
                "type": "string",
                "example": "true"
            },
            "required": false
        }
    ],
    "content": {
        "application/json": {
            "schema": {
                "type": "object",
                "example": {
                    "dateRangeStart": "2024-01-01",
                    "dateRangeEnd": "2026-01-01",
                    "range": true
                }
            }
        }
    },
    "responses": {
        "400": {
            "description": "Request body was empty."
        },
        "422": {
            "description": "Invalid date format. Should be YYYY-MM-DD."
        },
        "200": {
            "description": "There are XX appeals on YYYY-MM-DD.",
            "appeals": "[ ... ]"
        }
    }
};
const AppealStop = {
    "summary": "Отменить обращения",
    "tags": [
        "6) endpoint который отменит все обращения, которые находятся в статусе в работе"
    ],
    "responses": {
        "200": {
            "message": "All appeals statuses changed.",
        }
    }
};
exports.swLoginRoute = {
    "/appeal/create": {
        "post": Object.assign({}, AppealCreate)
    },
    "/appeal/process": {
        "put": Object.assign({}, AppealProceed)
    },
    "/appeal/close": {
        "put": Object.assign({}, AppealClose)
    },
    "/appeal/cancel": {
        "put": Object.assign({}, AppealCancel)
    },
    "/appeal/list?date=2024-01-01&dateRangeStart=2024-01-01&dateRangeEnd=2026-01-01&range=true": {
        "get": Object.assign({}, AppealList)
    },
    "/appeal/stop": {
        "post": Object.assign({}, AppealStop)
    }
};
