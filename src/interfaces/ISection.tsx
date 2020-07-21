export default interface ISection {
    idx: number,
    key: string,
    title: string,
    url: string,
    sub: Array<ISection>
}