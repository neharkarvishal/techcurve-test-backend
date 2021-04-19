declare namespace Express {
    interface Response {
        done(options: {
            data: Record<any, any> | Array<any> | any
            paging?: Record<string, unknown>
            code?: 200 | number
            message?: string
            status?: 'success' | 'error'
        })
    }
}
