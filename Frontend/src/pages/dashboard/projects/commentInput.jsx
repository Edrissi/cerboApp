import React from 'react';

function CommentInput({ comment, setComment, handleSubmit }) {
    return (
        <div>
            <textarea
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
                placeholder="Enter your comments..."
                onChange={(e) => {
                    setComment(e.target.value);
                }}
                value={comment}
            />
            <div className="flex justify-start">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default CommentInput;
