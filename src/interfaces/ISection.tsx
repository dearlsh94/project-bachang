export default interface ISection {
    key: string,
    title: string,
    url: string,
    sub: Array<ISection>
}