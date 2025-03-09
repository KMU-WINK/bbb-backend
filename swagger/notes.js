/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: 책 메모 관련 API
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: 사용자의 메모 목록 조회
 *     description: 사용자가 작성한 책 메모들을 불러옵니다.
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: 메모 목록 반환 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "메모를 불러옵니다."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       BookId:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "제목1111"
 *                       content:
 *                         type: string
 *                         example: "내용1111"
 *       400:
 *         description: 잘못된 요청
 */


/**
 * @swagger
 * /notes:
 *   post:
 *     summary: 책 메모 작성
 *     description: 특정 책에 대한 메모를 작성합니다.
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - title
 *               - content
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Note Title"
 *               content:
 *                 type: string
 *                 example: "Amazing book!"
 *     responses:
 *       201:
 *         description: 메모 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "메모를 게시했습니다."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     UserId:
 *                       type: integer
 *                       example: 1
 *                     BookId:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "제목"
 *                     content:
 *                       type: string
 *                       example: "내용"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-18T13:20:52.810Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-18T13:20:52.810Z"
 *       400:
 *         description: 잘못된 요청 (다 읽은 책에 대한 메모만 가능, 이미 해당 책에 대한 메모가 있는 경우)
 */

/**
 * @swagger
 * /notes:
 *   patch:
 *     summary: 메모 수정
 *     description: 사용자가 작성한 메모의 제목과 내용을 수정합니다.
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - title
 *               - content
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Update Title"
 *               content:
 *                 type: string
 *                 example: "So Amazing book!"
 *     responses:
 *       200:
 *         description: 메모 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "메모를 수정했습니다."
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: 잘못된 요청 (bookId 누락, 원본이 존재하지 않는 경우)
 */

/**
 * @swagger
 * /notes:
 *   delete:
 *     summary: 책 메모 삭제
 *     description: 특정 책에 대한 사용자의 메모를 삭제합니다.
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: 메모 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "메모를 삭제했습니다."
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: 잘못된 요청 (bookId 누락, 원본이 존재하지 않는 경우)
 */