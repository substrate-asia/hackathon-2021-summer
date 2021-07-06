// 创建nutbox推荐人remark
export const createCrowdloanRemark = (api, trieIndex, communityId, nominatorId) => {
  const remark = api.createType('NutboxRemark', {
    magic: 'nutbox',
    op: 0,
    trieIndex,
    communityId,
    nominatorId,
  })
  return api.createType('Bytes', remark.toHex())
}

export const createCrowdstakingRemark = (api, communityId, projectId, nominatorId) => {
    const remark = api.createType('NutboxRemark', {
        magic: 'nutbox',
        op: 1,
        communityId,
        projectId,
        nominatorId
    })
    return api.createType('Bytes', remark.toHex())
}

/**
 *  创建khala的众贷推荐机制remark, chian Id  2004
 * @param {*} api
 * @param {*} paraId
 * @param {*} referrer   // 推荐人
 * @returns 
 */
export const createKhalaReferrerRemark = (api, paraId, referrer) => {
  const refAcc = api.createType('AccountId', referrer)
  const remark = api.createType('PhalaCrowdloanReferrerRemark', {
    magic: 'CR',
    paraId,
    referrer: refAcc,
    referrerHash: refAcc.hash.toHex()
  })
  return api.createType('Bytes', remark.toHex())
}