import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.portfolio.findFirst({
                    where: {
                        id: req.query.id
                    }
                });
                prisma.$disconnect();
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                await prisma.portfolio.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        image: req.body.image,
                        name: req.body.name,
                        detail: req.body.detail,
                    }
                })
                prisma.$disconnect();
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                await prisma.portfolio.delete({
                    where: {
                        id: req.query.id
                    }
                });
                prisma.$disconnect();
                res.status(204).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}