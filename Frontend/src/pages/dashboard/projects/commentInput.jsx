import React from 'react';

function CommentInput({ comment, setComment, handleSubmit }) {
    return (
        <div>
            <textarea
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                style={{
                    backgroundColor: '#faf0e6',  // Background color for the textarea
                    color: 'black',  // Text color for the textarea
                    border: '1px solid #ccc',  // Border color (if needed)
                    borderRadius: '5px',  // Rounded corners
                    padding: '8px',  // Padding inside the textarea
                    fontSize: '14px',  // Font size of the text
                    lineHeight: '1.5',  // Line height for better readability
                }}
                rows="4"
                placeholder="Entrez votre commentaire..."
                onChange={(e) => {
                    setComment(e.target.value);
                }}
                value={comment}
            />
            <div className="flex justify-end">
                <button
                    className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Ajouter 
                </button>
            </div>
        </div>
    );
}

export default CommentInput;
