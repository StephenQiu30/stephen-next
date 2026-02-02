/**
 * 搜索类型枚举
 */
export enum SearchTypeEnum {
    POST = "post",
    USER = "user",
}

export const SearchTypeMap = {
    [SearchTypeEnum.POST]: "帖子",
    [SearchTypeEnum.USER]: "用户",
};
