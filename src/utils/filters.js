import dayjs from 'dayjs'

/**
* 日期格式化
* @param date
* @param formatStr
*/
export function dayformat(date, formatStr) {
  if (date) {
    // 24小时制
    return dayjs(date).format(formatStr || 'YYYY-MM-DD HH:mm')
  } else {
    return ''
  }
}

/**
* 数据审核状态
* @param Status
*/
export function fileRecordStatusFormat(fileRecordStatus) {
  if (fileRecordStatus === 0) {
    return '等待分析'
  } else if (fileRecordStatus === 1) {
    return '分析中'
  } else if (fileRecordStatus === 2) {
    return '正常结束'
  } else if (fileRecordStatus === 3) {
    return '分析结果异常'
  }
}

/**
* 数据审核状态
* @param auditStatus
* @param updateTime 更新时间 空为未初始化
*/
export function auditStatusFormat(auditStatus, updateTime) {
  if (!updateTime) {
    return '项目未初始化'
  } else {
    if (auditStatus === 1) {
      return '审核中'
    } else if (auditStatus === 2) {
      return '审核通过'
    } else if (auditStatus === 3) {
      return '审核驳回'
    } else {
      return '未提交审核'
    }
  }
}

/**
* 月报审核状态
* @param auditStatus
* @param updateTime 更新时间 空为未填写
*/
export function monthAuditStatusFormat(auditStatus, id) {
  if (!id) {
    return '未填写'
  } else {
    if (auditStatus === 1) {
      return '审核中'
    } else if (auditStatus === 2) {
      return '审核通过'
    } else if (auditStatus === 3) {
      return '审核驳回'
    } else {
      return '未提交审核'
    }
  }
}

/**
* 产品审核状态
* @param auditStatus
*/
export function productAuditStatusFormat(auditStatus) {
  if (auditStatus === 1) {
    return '审核中'
  } else if (auditStatus === 2) {
    return '审核通过'
  } else if (auditStatus === 3) {
    return '审核驳回'
  } else {
    return '未提交审核'
  }
}

/**
* 公司审核状态
* @param auditStatus
*/
export function companyAuditStatusFormat(auditStatus) {
  if (auditStatus === 1) {
    return '审核中'
  } else if (auditStatus === 2) {
    return '审核通过'
  } else if (auditStatus === 3) {
    return '审核驳回'
  } else {
    return '未提交审核'
  }
}

/**
* 工业其它用途label
* @param id
*/
export function useDescLabelFormat(id) {
  if (id === 1) {
    return '化工原料具体用途描述'
  } else if (id === 2) {
    return '还原气体具体用途描述'
  } else if (id === 3) {
    return '保护气体具体用途描述'
  } else if (id === 4) {
    return '冷却剂具体用途描述'
  } else if (id === 5) {
    return '其它具体用途描述'
  }
}
