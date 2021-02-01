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
            const {name} = req.body
            let findedPerson
            for (const person of playrooms) {
                if (person.participants.includes(name)) {
                    findedPerson = person
                }
            }
            res.json(findedPerson)
        } catch
            (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова. Ошибка:' + e})
        }
    }
)

module.exports = router