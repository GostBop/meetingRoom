import Mock from 'mockjs'
/* eslint-disable */

export default Mock.mock('/getTableData', {
  'total': 66,
  'meetings|5': [{
    'date': '@date',
    'time': '@time',
    'topic': '@csentence',
    'master': '@cname',
    'participator|3': '@cname'
  }]
})
