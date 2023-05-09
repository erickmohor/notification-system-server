import { FastifyReply, FastifyRequest } from 'fastify'


export function verifyUserRole(roleToVerify: 'admin' | 'member') {
  return async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {

    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  
  }
}