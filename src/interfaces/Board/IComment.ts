import IWriter from 'interfaces/Common/IWriter';

interface IComment {
  idx?: number,
  message: string,
  writer: IWriter
  recommentList?: Array<{
    idx?: number,
    message: string,
    writer: IWriter
  }>
}

export default IComment;