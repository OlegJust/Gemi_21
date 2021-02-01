const {Router} = require('express') // подключаем роутыры
const router = Router() // подключаем роутыры
const {check, validationResult} = require('express-validator')
const Playrooms = require("../models/Playrooms")
const auth = require('../middleware/auth.middleware')

let {playrooms} = require("../temporaryDatabase/temporaryDatabase")

router.post(
    '/generate',auth,
    [
        check('type', 'Введите корректный type').isString(),
        check('name', 'Введите корректный number').isString(),
    ],
    async (req, res) => { // res --- response --- ответ;req --- request --- запрос
        try {
            const errors = validationResult(req)// validationResult --- Результат проверки

            if (!errors.isEmpty()) {// проверяем прошли ли проверку даные из фронтенда
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации'
                })// return --- что бы не было продолжения кода// если есть ошибки возрошаем в фронтед эти даные
            }
            // |------------- теперь логика  логикой ------------|
            const {name,type} = req.body

            const playrooms = new Playrooms({name:name,type})

            await playrooms.save()
            res.status(201).json({message: "То что в бади " + req.body}) // мы отвечаем фронтеду

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова. Ошибка: ' + e})
        }
    })

router.get('/',auth, async (req, res) => {
    try {
        res.json(playrooms)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова. Ошибка:' + e})
    }
})

module.exports = router