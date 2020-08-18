export default interface ISignUpUser {
  id: string,
  password: string,
  mail: string,
  salt?: string
}
