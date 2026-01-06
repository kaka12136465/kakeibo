import * as functions from 'firebase-functions';
export declare const extractReceiptText: functions.https.CallableFunction<any, Promise<{
    success: boolean;
    text: string;
    message: string;
    confidence?: never;
} | {
    success: boolean;
    text: string;
    confidence: number;
    message?: never;
}>, unknown>;
//# sourceMappingURL=index.d.ts.map