/**
 * @swagger
 * tags:
 *   name: Finishlist
 *   description: 책 읽기 API
 */

/**
 * @swagger
 * /finishlist:
 *   get:
 *     summary: 사용자의 읽은 책 목록 조회
 *     description: 사용자의 읽은 책 목록을 불러옵니다.
 *     tags:
 *       - Finishlist
 *     responses:
 *       200:
 *         description: 읽은 책 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "읽은 책을 불러옵니다."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "책 제목"
 *                       authors:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["작가"]
 *                       isbn:
 *                         type: string
 *                         example: "isbn"
 *                       publisher:
 *                         type: string
 *                         example: "출판사"
 *                       thumbnail:
 *                         type: string
 *                         example: "책 표지 링크"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-08T07:46:40.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-08T07:46:40.000Z"
 */

/**
 * @swagger
 * /finishlist:
 *   post:
 *     summary: 책을 다 읽음
 *     description: 사용자가 책을 다 읽었습니다.
 *     tags:
 *       - Finishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: "책 번호"
 *     responses:
 *       200:
 *         description: 책을 사용자의 읽은 책 목록에 추가
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "책을 다 읽었습니다."
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: 잘못된 요청 (필요한 필드 누락, 등록되지 않은 책)
 */

/**
 * @swagger
 * /finishlist:
 *   delete:
 *     summary: 읽은 책 삭제
 *     description: 사용자가 읽은 책을 삭제합니다.
 *     tags:
 *       - Finishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: "책 번호"
 *     responses:
 *       200:
 *         description: 사용자 요청에 따라 읽은 책 삭제
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "책이 성공적으로 삭제되었습니다."
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: 잘못된 요청 (필요한 필드 누락, 등록되지 않은 책)
 */