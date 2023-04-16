import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Длина пароля минимум 5 символов').isLength({min:5}),
    body('fullName', 'Укажите имя').isLength({min:3}),
    body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL(),
]

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Длина пароля минимум 5 символов').isLength({min:5}),
]

export const ticketCreateValidation = [
    body('title', 'Требуется название').isLength({min:3}).isString(),
    body('description', 'Требуется описание').isLength({min:10}).isString(),
    body('attachementUrl', 'Требуется ссылка на файл').optional().isURL(),
]