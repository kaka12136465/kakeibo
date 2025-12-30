import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import {storage, functions} from "@/firebase";


export const ImageOcrComponent = () => {
    const [image, setImage] = useState<File | null>(null);
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleScan = async () => {
        console.log("handleScan");
        //if (!image) return;
        
        setLoading(true);
        try {
            //画像をアップロード
            //const storageRef = ref(storage, `receipts/${Date.now()}_${image.name}`);
            //console.log(image);
            //await uploadBytes(storageRef, image);
            //console.log("success");
            //const imageUrl = await getDownloadURL(storageRef);
            
            // OCR実行
            const imageUrl = "https://firebasestorage.googleapis.com/v0/b/kakeibo-kaka1166.firebasestorage.app/o/receipts%2F1765343581782_0011.jpg?alt=media&token=5a34ad6b-b003-4e8e-a43e-55563959160f"
            console.log(imageUrl)
            const ocrFunction = httpsCallable(functions, 'extractReceiptText');
            const response = await ocrFunction({imageUrl}) as any;
            console.log(response.data);
            
            setResult(response.data.text);
        } catch (error) {
            alert('エラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Image OCR Componenteaa</h2>
            
            <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            
            <button onClick={handleScan}>
                認識
            </button>
            
            {result && (
                <pre style={{ background: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
                    {result}
                </pre>
            )}
        </div>
    );
};