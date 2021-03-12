const {Router} = require('express') // подключаем роутыры
const router = Router() // подключаем роутыры
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')

let {playrooms} = require("../temporaryDatabase/temporaryDatabase")

router.post('/', auth,
    [
        check('name', 'Введите корректный number').isString(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {// проверяем прошли ли проверку даные из фронтенда
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации'
                })// return --- что бы не было продолжения кода// если есть ошибки возрошаем в фронтед эти даные
            }

            // |------------- теперь логика  логикой ------------|
            const {id: roomId} = req.params;
            console.log(`roomId: ${roomId}`)
            const obj = rooms.has(roomId)
                ? {
                    users: [...rooms.get(roomId).get('users').keys()],
                    messages: [...rooms.get(roomId).get('messages').values()],
                }
                : {users: [], messages: []};
            console.log(obj)
            res.json(obj);
        } catch
            (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова. Ошибка:' + e})
        }
    }
)

module.exports = router