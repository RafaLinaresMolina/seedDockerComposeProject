"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
var typeorm_1 = require("typeorm");
exports.UserEntity = new typeorm_1.EntitySchema({
    name: 'user',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        age: {
            type: Number
        }
    }
});
//# sourceMappingURL=User.js.map