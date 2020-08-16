import IWriter from 'interfaces/Common/IWriter';

export default interface IPost {
  key: string,
  section: string,
  title: string,
  content: string,
  writer: IWriter,
  viewCount: number
}