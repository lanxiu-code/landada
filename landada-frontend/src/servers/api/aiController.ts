// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 此处后端没有提供注释 POST /ai/generate */
export async function aiGenerateQuestion(
  body: API.AiGenerateQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListQuestionContentVO>('/ai/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /ai/generate/sse */
export async function aiGenerateQuestionSse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.aiGenerateQuestionSSEParams,
  options?: { [key: string]: any },
) {
  return request<API.SseEmitter>('/ai/generate/sse', {
    method: 'GET',
    params: {
      ...params,
      aiGenerateQuestionRequest: undefined,
      ...params['aiGenerateQuestionRequest'],
    },
    ...(options || {}),
  });
}
