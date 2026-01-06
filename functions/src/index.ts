// functions/src/index.ts
import * as functions from 'firebase-functions';  // ← ここを修正
import vision from '@google-cloud/vision';        // ← ここを修正

const client = new vision.ImageAnnotatorClient();

export const extractReceiptText = functions.https.onCall(
    async (request) => {
        try {
            const { imageUrl } = request.data;
            console.log(imageUrl);
            
            const [result] = await client.textDetection(imageUrl);
            const detections = result.textAnnotations;
            
            if (!detections || detections.length === 0) {
                return {
                    success: false,
                    text: '',
                    message: 'テキストが検出されませんでした'
                };
            }
            
            const fullText = detections[0]?.description ?? '';
            const confidence = detections[0]?.confidence ?? 0;
            
            return {
                success: true,
                text: fullText,
                confidence: confidence,
            };
        } catch (error) {
            console.error('OCR Error:', error);
            throw new functions.https.HttpsError(
                'internal',
                'OCR処理に失敗しました'
            );
        }
    }
);