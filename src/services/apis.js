const BASE_URL=process.env.REACT_APP_BASE_URL

export const categories={
    SHOWCATEGORIES_API:BASE_URL + "/category/get-all-categories",
    GET_CATEGORY_DETAILS_PAGE_API:BASE_URL + "/categories/categoryPage"
}

export const resetPassword={
    RESET_PASSWORD_TOKEN_API:BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD_API:BASE_URL + "/auth/reset-password"
}


export const auth={
    SIGNUP_API:BASE_URL + "/auth/signup",
    SEND_OTP_API:BASE_URL + "/auth/verify-otp",
    LOGIN_API:BASE_URL + "/auth/login"
    
}


export const books={
    GENRE_BOOKS_API:BASE_URL + "/book/get-genre-books",
    ALL_BOOKS_API:BASE_URL + "/book/get-all-books"
}
