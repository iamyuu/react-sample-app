// @ts-nocheck
import {rest} from 'msw'
import faker from 'faker'

const API_URL = import.meta.env.VITE_API_URL

const employees = [...Array(9)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.fake('{{name.firstName}} {{name.lastName}}'),
  email: faker.internet.exampleEmail(),
  gender: faker.name.gender(),
  address: faker.address.streetAddress(true),
  job_title: faker.name.jobTitle(),
  birth: {
    place: faker.address.cityName(),
    data: faker.datatype.datetime({min: 1980, max: 2000}).toISOString(),
  },
  status: faker.datatype.boolean(),
  photo: faker.internet.avatar(),
}))

export const handlers = [
  rest.get(`${API_URL}/employee`, (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(200), ctx.json({data: employees}))
  }),
  rest.put(`${API_URL}/employee/:id`, (req, res, ctx) => {
    const index = employees.findIndex(val => val.id === req.params.id)
    employees.splice(index, 1, req.body)

    return res(ctx.status(200), ctx.json({message: 'Success'}))
  }),
]