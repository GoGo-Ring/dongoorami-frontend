export interface FormValues {
  nickname: string;
  gender: '' | 'male' | 'female';
  year: number | '';
  month: number | '';
  day: number | '';
}

const validate = (values: FormValues) => {
  const errors = {
    nickname: '',
    gender: '',
    birthDate: '',
  };

  if (!values.nickname) {
    errors.nickname = '닉네임을 입력해주세요';
  }
  if (!values.gender) {
    errors.gender = '성별을 선택해주세요';
  }
  if (!values.year || !values.month || !values.day) {
    errors.birthDate = '생년월일을 입력해주세요';
  } else if (isNaN(values.year) || isNaN(values.month) || isNaN(values.day)) {
    errors.birthDate = '생년월일은 숫자로 입력해주세요';
  }

  return errors;
};

export default validate;
