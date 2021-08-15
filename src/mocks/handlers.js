import {rest} from 'msw'
import faker from 'faker'

const API_URL = import.meta.env.VITE_API_URL

const jobTitles = [...Array(9)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.jobTitle(),
}))

const employees = [...Array(5)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.fake('{{name.firstName}} {{name.lastName}}'),
  job_title: jobTitles[faker.datatype.number({min: 2, max: 8})],
  status: faker.datatype.boolean(),
}))

export const handlers = [
  rest.get(`${API_URL}/job-title`, (_, res, ctx) => {
    return res(ctx.delay(), ctx.status(200), ctx.json({data: jobTitles}))
  }),
  rest.get(`${API_URL}/employee`, (_, res, ctx) => {
    return res(ctx.delay(), ctx.status(200), ctx.json({data: employees}))
  }),
  rest.get(`${API_URL}/employee/:id`, (req, res, ctx) => {
    const employee = employees.find(value => value.id === req.params.id)
    return res(ctx.delay(), ctx.status(200), ctx.json({data: employee}))
  }),
  rest.patch(`${API_URL}/employee/:id`, (req, res, ctx) => {
    const index = employees.findIndex(val => val.id === req.params.id)
    const newJobTitle = jobTitles.find(val => val.id === req.body.jobTitle)

    const newEmployee = {
      ...employees[index],
      ...req.body,
      job_title: newJobTitle,
    }

    employees.splice(index, 1, newEmployee)

    return res(ctx.delay(), ctx.status(200), ctx.json({message: 'Success'}))
  }),
  rest.patch(`${API_URL}/employee/:id/change-status`, (req, res, ctx) => {
    const index = employees.findIndex(employee => employee.id === req.params.id)
    employees.splice(index, 1, {...employees[index], status: req.body.newStatus})

    return res(ctx.delay(), ctx.status(200), ctx.json({message: 'Success'}))
  }),
]
