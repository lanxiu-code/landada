// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 此处后端没有提供注释 POST /scoringResult/add */
export async function addScoringResult(
  body: API.ScoringResultAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/scoringResult/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoringResult/delete */
export async function deleteScoringResult(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/scoringResult/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoringResult/edit */
export async function editScoringResult(
  body: API.ScoringResultEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/scoringResult/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /scoringResult/get/vo */
export async function getScoringResultVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getScoringResultVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseScoringResultVO>('/scoringResult/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoringResult/list/page */
export async function listScoringResultByPage(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageScoringResult>('/scoringResult/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoringResult/list/page/vo */
export async function listScoringResultVoByPage(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageScoringResultVO>('/scoringResult/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoringResult/my/list/page/vo */
export async function listMyScoringResultVoByPage(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageScoringResultVO>('/scoringResult/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoringResult/update */
export async function updateScoringResult(
  body: API.ScoringResultUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/scoringResult/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
