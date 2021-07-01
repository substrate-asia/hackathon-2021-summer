// Copyright (c) Open Enclave SDK contributors.
// Licensed under the MIT License.
//
#define ADD_TEST_CHECKING

#define TLS_CLIENT "TLS client: "
#define TLS_SERVER "TLS server: "

#define CLIENT_PAYLOAD "GET /ipfs/bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m HTTP/1.1.                                                                                                                                                                                                                                                                                                                                                          \r\n\r\n"
#define SERVER_PAYLOAD                                   \
    "HTTP/1.0 200 OK\r\nContent-Type: text/html\r\n\r\n" \
    "<h2>mbed TLS Test Server</h2>\r\n"                  \
    "<p>Successful connection : </p>\r\n"                \
    "A message from TLS server inside enclave\r\n"

#define CLIENT_PAYLOAD_SIZE strlen(CLIENT_PAYLOAD)
//#define CLIENT_PAYLOAD_SIZE  92
#define SERVER_PAYLOAD_SIZE strlen(SERVER_PAYLOAD)
