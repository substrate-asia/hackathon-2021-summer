import { httpGet } from './http';
import { TestParams } from '@wasmark/apps-common';
import type { Observable } from 'rxjs';

const API_BASE = '/api';

/**
 * 
 */
export const apiGetInitialConfig =
  (): Observable<TestParams> => httpGet<TestParams>(`${API_BASE}/config`);

// /**
//  * 新建数据
//  */
// export const apiCreateProject =
//   async (data: ProjectCreatDto) => await httpPost<Project>(`${API_BASE}/project/create`, data);
