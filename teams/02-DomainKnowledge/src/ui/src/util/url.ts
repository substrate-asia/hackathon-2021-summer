import * as queryString from "query-string";
// import Collection from "models/Collection";
// import Document from "models/Document";

export function home(): string {
  return "/home";
}

// export function documentUrl(doc: Document): string {
//   return doc.url;
// }

// export function editDocumentUrl(doc: Document): string {
//   return `${doc.url}/edit`;
// }

// export function documentMoveUrl(doc: Document): string {
//   return `${doc.url}/move`;
// }

// export function documentHistoryUrl(doc: Document, revisionId?: string): string {
//   let base = `${doc.url}/history`;
//   if (revisionId) base += `/${revisionId}`;
//   return base;
// }

// /**
//  * Replace full url's document part with the new one in case
//  * the document slug has been updated
//  */
// export function updateDocumentUrl(oldUrl: string, document: Document): string {
//   // Update url to match the current one
//   return oldUrl.replace(new RegExp("/doc/[0-9a-zA-Z-_~]*"), document.url);
// }

// export function newDocumentUrl(
//   collectionId: string,
//   params?: {
//     parentDocumentId?: string,
//     templateId?: string,
//     template?: boolean,
//   }
// ): string {
//   return `/collection/${collectionId}/new?${queryString.stringify(params)}`;
// }

export function searchUrl(query?: string): string {
  let route = "/search";
  let queryString = encodeURIComponent(query.replace("%", "%25"));

  return `${route}/${queryString}`;
}

// export function notFoundUrl(): string {
//   return "/404";
// }

// export const matchDocumentSlug =
//   ":documentSlug([0-9a-zA-Z-_~]*-[a-zA-z0-9]{10,15})";

// export const matchDocumentEdit = `/doc/${matchDocumentSlug}/edit`;
