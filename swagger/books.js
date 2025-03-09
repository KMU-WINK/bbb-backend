/**
 * @swagger
 * tags:
 *   name: Books
 *   description: 책 검색 API
 */

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: 책 검색
 *     description: 사용자가 특정 키워드를 통해 책을 검색합니다.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: 검색할 키워드
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 검색 결과 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "책을 찾았습니다."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     documents:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: "책제목"
 *                           authors:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["작가"]
 *                           contents:
 *                             type: string
 *                             example: "책 상세 설명"
 *                           datetime:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-16T00:00:00.000+09:00"
 *                           isbn:
 *                             type: string
 *                             example: "8954781713 9788954781718"
 *                           price:
 *                             type: integer
 *                             example: 8700
 *                           sale_price:
 *                             type: integer
 *                             example: 7830
 *                           publisher:
 *                             type: string
 *                             example: "출판사"
 *                           status:
 *                             type: string
 *                             example: "정상판매"
 *                           thumbnail:
 *                             type: string
 *                             example: "책 표지 링크"
 *                           translators:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: []
 *                           url:
 *                             type: string
 *                             format: uri
 *                             example: "책 관련 링크"
 *       400:
 *         description: 잘못된 요청 (쿼리 파라미터 누락)
 */