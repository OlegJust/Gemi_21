const {Router} = require('express') // подключаем роутыры
const router = Router() // подключаем роутыры

const User = require('../models/User')

const {check, validationResult} = require('express-validator')

const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')




//к даному роутеру уже приходит /api/auth
// /api/auth/register
router.post(
  '/register',
  [
    check('name', 'Некорректный name').isString(),
    check('email', 'Некорректный email').isEmail(),// вызываю check и говорю что нужно проверять, допустим "email" и если есть какая-та ошибка связаная с email
    // то её можно записать вторым параметром. isEmail --- проверяем что это емаил
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
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

    const {email, password, name} = req.body// в боде приходит инфо из фронтенда

    // логика регистрациии, проверяем если такой email в базе если нету то выдаем ощыбку не регистрируемого пользователя
    const candidate = await User.findOne({ email })// await -- ждем, ждем пока модель пользователя(User) будет искать человека по  email // короче с начала проверяем нет ли ктото с таким же еmail

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })// .json вывести сообщение
    }
    // зашифровать его пароль есль будем просто его хранит то его можно лигко взломать
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword, name })// создаем нового пользователя

    await user.save()// ждём пока пользователь сахраница после того когда этот промис завершится

    res.status(201).json({ message: 'Пользователь создан' }) // мы отвечаем фронтеду

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}) // вторым параметром у нас функция где будем выполнять логику
// // GET	--- для получения ккихто даных
// // PUT	--- для полного обновления илемента
// // PATCH --- чистичное обновление
// // DELETE	-- для удаления
// // POST -- для создания

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()// exists --- сушествовать тоить пороль должен существовать
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {// проверка на ошибки
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему'
      })
    }

    // дальше логика

    const {email, password ,name} = req.body

    const user = await User.findOne({ email }) // есть ли такой чиловек

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    // проверяем пароль
    const isMatch = await bcrypt.compare(password, user.password)// compare --- мы сравниваем пароль с зашифрованым

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }
    // если вы дошли до сюда то у пользователя все хорошо теперь мы проши авторизацию

    //создаем токен
    const token = jwt.sign(
      { userId: user.id },// в первом мы указываем те даные которые будут зашифровать в даном jwt токене
      config.get('jwtSecret')// вторым передаем секретный ключь
    )

    res.json({ token, userId: user.id, name:name })// статус не указываем он по умалчанию 200

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
