/**
 * Validation Regex Constants
 */

// 이메일 형식: [텍스트]@[텍스트].[텍스트]
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 비밀번호 형식: 영문, 숫자 포함 8자 이상
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

// 닉네임 형식: 2~10자의 영문, 숫자, 한글
export const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]{2,10}$/;
