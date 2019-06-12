const APIError = require('../rest').APIError;

users = [{
    username: '张三',
    password: '123',
    department: '业务部'
}, {
    username: '李四',
    password: '123',
    department: '工程部'
}, {
    username: '王五',
    password: '123',
    department: '生产部'
}, {
    username: '王大绩',
    password: '123',
    department: '管理部'
}, {
    username: '陈天宇',
    password: '123',
    department: '业务部'
}, {
    username: '林玉朗',
    password: '123',
    department: '工程部'
}, {
    username: '吴莹莹',
    password: '123',
    department: '生产部'
}]

department = ["业务部", "管理部", "工程部", "生产部"]

meetings = [{
    topic: '电子政务',
    master: ['张三'],
    participant: ['李四'],
    meeting_time: '2019-05-24 09:15'
}, {
    topic: '机器学习',
    master: ['吴莹莹'],
    participant: ['张三'],
    meeting_time: '2019-05-25 09:15'
}, {
    topic: '高等数学',
    master: ['李四'],
    participant: ['张三'],
    meeting_time: '2019-05-26 09:15'
}, {
    topic: '概率论',
    master: ['张三'],
    participant: ['王大绩'],
    meeting_time: '2019-05-23 09:15'
}, {
    topic: '程序设计',
    master: ['王大绩'],
    participant: ['陈天宇'],
    meeting_time: '2019-05-24 09:15'
}, {
    topic: '离散数学',
    master: ['林玉朗'],
    participant: ['李四'],
    meeting_time: '2019-05-24 19:15'
}
]

module.exports = {
    'GET /api/': async (ctx, next) => {
        let result = "ssss"
        ctx.rest(result);
    },

    'POST /register': async (ctx, next) => {
        console.log(ctx.request.body);
        user = ctx.request.body
        let result = {
            isRegister: -1
        }

        for(var i in users) {
            if(users[i].username == user.username) {
                result = {
                    isRegister: 0
                }
            }

        }

        if(result.isRegister == -1) {
            result = {
                isRegister: 1
            }
            users.push({
                username: user.username,
                password: user.password,
                department: user.department
            })
        }

        ctx = options(ctx);
        ctx.body = result;
    },

    'POST /login': async (ctx, next) => {
        console.log(ctx.request.body);
        user = ctx.request.body;
        let result;

        for(var i in users) {
            if(users[i].username == user.username) {
                if(users[i].password == user.password) {
                    result = {
                        islogin: 1,
                        user: users[i]
                    }
                } else {
                    result = {
                        islogin: 0,
                        user: ''
                    }
                }
                break;
            }
        }
        console.log(result)

        ctx = options(ctx);
        ctx.body = result;
    },


    'GET /getdept': async (ctx, next) => {
        let result = [{
            id: 1,
            name: "业务部",
            children: []
        }, {
            id: 2,
            name: '管理部',
            children: []
        }, {
            id: 3,
            name: '工程部',
            children: []
        }, {
            id: 4,
            name: '生产部',
            children: []
        }];
        for(var j in department) {
            for(var i in users) {
                if(users[i].department == department[j]) {
                    result[j].children.push({
                        id: 0,
                        name: users[i].username
                    })
                }
            }
        }
        
        console.log(result)

        ctx = options(ctx);
        ctx.body = result;
    },

    'POST /createMeeting': async (ctx, next) => {
        console.log(ctx.request.body);
        meeting = ctx.request.body;
        meeting.data.master = [meeting.data.master.username]
        meetings.push(meeting.data)
        let result = {
            isSuccess : 1
        };
        console.log(meetings)

        ctx = options(ctx);
        ctx.body = result;
    },

    'POST /getTableData': async (ctx, next) => {
        console.log(ctx.request.body);
        query = ctx.request.body;
        let m_query = []
        if(query.data.meeting_time != null && query.data.meeting_time != '') {
            start = query.data.meeting_time[0].slice(0, 10)
            end = query.data.meeting_time[1].slice(0, 10)
            
            for(var i in meetings) {
                time = meetings[i].meeting_time.slice(0, 10)
                
                if(time >= start && time <= end) {
                    console.log(time)
                    m_query.push(meetings[i])
                }
            }
        } else {
            m_query = meetings
        }
        let m_query_topic = []
        if(query.data.topic != '') {
            for(var i in m_query) {
                if(m_query[i].topic == query.data.topic) {
                    m_query_topic.push(m_query[i])
                }
            }
        } else {
            m_query_topic = m_query
        }

        let length
        if(query.currentPage * 5 > m_query_topic.length) {
            length = m_query_topic.length
        } else {
            length = query.currentPage * 5
        }
        index = (query.currentPage - 1) * 5
        let m = []
        for(var i = index; i < length; i++) {
            m.push(m_query_topic[i])
        }
        let result = {
            total : meetings.length,
            meetings : m
        };
        console.log(m)

        ctx = options(ctx);
        ctx.body = result;
    }
};
function options(ctx) {
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Max-Age', 3600 * 24);
    return ctx;
}