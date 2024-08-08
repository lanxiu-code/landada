declare namespace API {
  type AiGenerateQuestionRequest = {
    appId?: number;
    questionNum?: number;
    optionNum?: number;
  };

  type aiGenerateQuestionSSEParams = {
    aiGenerateQuestionRequest: AiGenerateQuestionRequest;
  };

  type App = {
    id?: number;
    appName?: string;
    appDesc?: string;
    appIcon?: string;
    appType?: number;
    scoringStrategy?: number;
    reviewStatus?: number;
    reviewMessage?: string;
    reviewerId?: number;
    reviewTime?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type AppAddRequest = {
    appName?: string;
    appDesc?: string;
    appIcon?: string;
    appType?: number;
    scoringStrategy?: number;
  };

  type AppEditRequest = {
    id?: number;
    appName?: string;
    appDesc?: string;
    appIcon?: string;
    appType?: number;
    scoringStrategy?: number;
  };

  type AppQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    appName?: string;
    appType?: number;
    scoringStrategy?: number;
    reviewStatus?: number;
    userId?: number;
  };

  type AppUpdateRequest = {
    id?: number;
    appName?: string;
    appDesc?: string;
    appIcon?: string;
    appType?: number;
    scoringStrategy?: number;
    reviewStatus?: number;
  };

  type AppVO = {
    id?: number;
    appName?: string;
    appDesc?: string;
    appIcon?: string;
    appType?: number;
    scoringStrategy?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    user?: UserVO;
  };

  type BaseResponseAppVO = {
    code?: number;
    data?: AppVO;
    message?: string;
  };

  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListQuestionContentVO = {
    code?: number;
    data?: QuestionContentVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageApp = {
    code?: number;
    data?: PageApp;
    message?: string;
  };

  type BaseResponsePageAppVO = {
    code?: number;
    data?: PageAppVO;
    message?: string;
  };

  type BaseResponsePageQuestion = {
    code?: number;
    data?: PageQuestion;
    message?: string;
  };

  type BaseResponsePageQuestionVO = {
    code?: number;
    data?: PageQuestionVO;
    message?: string;
  };

  type BaseResponsePageScoringResult = {
    code?: number;
    data?: PageScoringResult;
    message?: string;
  };

  type BaseResponsePageScoringResultVO = {
    code?: number;
    data?: PageScoringResultVO;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserAnswer = {
    code?: number;
    data?: PageUserAnswer;
    message?: string;
  };

  type BaseResponsePageUserAnswerVO = {
    code?: number;
    data?: PageUserAnswerVO;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseQuestionVO = {
    code?: number;
    data?: QuestionVO;
    message?: string;
  };

  type BaseResponseScoringResultVO = {
    code?: number;
    data?: ScoringResultVO;
    message?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserAnswerVO = {
    code?: number;
    data?: UserAnswerVO;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type checkParams = {
    timestamp: string;
    nonce: string;
    signature: string;
    echostr: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getAppVOByIdParams = {
    id: number;
  };

  type getQuestionVOByIdParams = {
    id: number;
  };

  type getScoringResultVOByIdParams = {
    id: number;
  };

  type getUserAnswerVOByIdParams = {
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type LoginUserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageApp = {
    records?: App[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageAppVO = {
    records?: AppVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageQuestion = {
    records?: Question[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageQuestionVO = {
    records?: QuestionVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageScoringResult = {
    records?: ScoringResult[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageScoringResultVO = {
    records?: ScoringResultVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUserAnswer = {
    records?: UserAnswer[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUserAnswerVO = {
    records?: UserAnswerVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type Question = {
    id?: number;
    questionContent?: string;
    appId?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type QuestionAddRequest = {
    questionContent?: string;
    appId?: number;
  };

  type QuestionContentVO = {
    title?: string;
    options?: Record<string, any>[];
  };

  type QuestionEditRequest = {
    id?: number;
    questionContent?: string;
  };

  type QuestionQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    questionContent?: string;
    appId?: number;
    userId?: number;
  };

  type QuestionUpdateRequest = {
    id?: number;
    questionContent?: string;
  };

  type QuestionVO = {
    id?: number;
    questionContent?: string;
    appId?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
  };

  type ReviewRequest = {
    appId?: number;
    reviewStatus?: number;
    reviewMessage?: string;
  };

  type ScoringResult = {
    id?: number;
    resultName?: string;
    resultDesc?: string;
    resultPicture?: string;
    resultProp?: string;
    resultScoreRange?: number;
    appId?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ScoringResultAddRequest = {
    resultName?: string;
    resultDesc?: string;
    resultPicture?: string;
    resultProp?: string;
    resultScoreRange?: number;
    appId?: number;
  };

  type ScoringResultEditRequest = {
    id?: number;
    resultName?: string;
    resultDesc?: string;
    resultPicture?: string;
    resultProp?: string;
    resultScoreRange?: number;
    appId?: number;
    userId?: number;
  };

  type ScoringResultQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    resultName?: string;
    resultProp?: string;
    resultScoreRange?: number;
    appId?: number;
    userId?: number;
  };

  type ScoringResultUpdateRequest = {
    id?: number;
    resultName?: string;
    resultDesc?: string;
    resultPicture?: string;
    resultProp?: string;
    resultScoreRange?: number;
    appId?: number;
    userId?: number;
  };

  type ScoringResultVO = {
    id?: number;
    resultName?: string;
    resultDesc?: string;
    resultPicture?: string;
    resultProp?: string;
    resultScoreRange?: number;
    appId?: number;
    userId?: number;
  };

  type SseEmitter = {
    timeout?: number;
  };

  type uploadFileParams = {
    uploadFileRequest: UploadFileRequest;
  };

  type UploadFileRequest = {
    biz?: string;
  };

  type User = {
    id?: number;
    userAccount?: string;
    userPassword?: string;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserAddRequest = {
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserAnswer = {
    id?: number;
    appId?: number;
    appType?: number;
    scoringStrategy?: number;
    choices?: string;
    resultId?: number;
    resultName?: string;
    resultDesc?: string;
    resultPicture?: string;
    resultScore?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserAnswerAddRequest = {
    id?: number;
    appId?: number;
    appType?: number;
    scoringStrategy?: number;
    choices?: string;
  };

  type UserAnswerEditRequest = {
    id?: number;
    appId?: number;
    appType?: number;
    scoringStrategy?: number;
    choices?: string;
    resultId?: number;
    resultName?: string;
    resultDesc?: string;
    resultPicture?: string;
    resultScore?: number;
  };

  type UserAnswerQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    appId?: number;
    appType?: number;
    scoringStrategy?: number;
    resultName?: string;
    resultScore?: number;
    userId?: number;
  };

  type UserAnswerUpdateRequest = {
    id?: number;
    appId?: number;
    appType?: number;
    scoringStrategy?: number;
    choices?: string;
    resultId?: number;
    resultName?: string;
    resultDesc?: string;
    resultPicture?: string;
    resultScore?: number;
  };

  type UserAnswerVO = {
    id?: number;
    appId?: number;
    appType?: number;
    scoringStrategy?: number;
    choices?: string;
    resultId?: number;
    resultName?: string;
    resultDesc?: string;
    resultPicture?: string;
    resultScore?: number;
    userId?: number;
    user?: UserVO;
    createTime?: string;
    updateTime?: string;
  };

  type userLoginByWxOpenParams = {
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type UserUpdateMyRequest = {
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAccount?: string;
    userPassword?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
  };
}
