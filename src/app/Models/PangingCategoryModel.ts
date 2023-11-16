export class PangingCategoryModel {
    public CategoryId: string = ''
    public SearchKey: string = ''
    public Accepted: boolean = true
    public PageSize: number = 9
    public PageIndex!: number
    public SortBy: string = ""
    public Direction: string = 'desc'
}