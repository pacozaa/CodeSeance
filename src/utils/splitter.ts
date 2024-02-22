import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
/* Additional steps : Split text into chunks with any TextSplitter. You can then use it as context or save it to memory afterwards. */

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 5000,
    chunkOverlap: 100,
});
// //docs in example
// const splitDocs = await textSplitter.splitDocuments(docs);//splitText??
// // console.log({ splitDocs });

// const avgDocLength = (documents: Document[]): number => {
//     return documents.reduce((sum, doc) => sum + doc.pageContent.length, 0) / documents.length;
// };
// const avgCharCountPre = avgDocLength(docs);
// const avgCharCountPost = avgDocLength(splitDocs);

// console.log(`Average length among ${docs.length} documents loaded is ${avgCharCountPre} characters.`);
// console.log(`After the split we have ${splitDocs.length} documents more than the original ${docs.length}.`);
// console.log(`Average length among ${docs.length} documents (after split) is ${avgCharCountPost} characters.`);