//! RPC interface for the members module.

pub use self::gen_client::Client as MembersClient;
use jsonrpc_core::{Error as RpcError, ErrorCode, Result};
use jsonrpc_derive::rpc;
use members_runtime_api::MembersApi as MembersRuntimeApi;
pub use members_runtime_api::MembersApi as MembersRuntimeRpcApi;
use primitives::AccountId;
use serde::{Deserialize, Serialize};
use sp_api::ProvideRuntimeApi;
use sp_blockchain::HeaderBackend;
use sp_core::Bytes;
use sp_runtime::{generic::BlockId, traits::Block as BlockT};
use std::sync::Arc;

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
pub struct QueryPlatformExpertParams {
    app_id: u32,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
pub struct QueryModelExpertParams {
    app_id: u32,
    model_id: Bytes,
}

#[rpc]
pub trait MembersApi<BlockHash, AccountId> {
    #[rpc(name = "members_isPlatformExpert")]
    fn is_platform_expert(
        &self,
        account: AccountId,
        query: QueryPlatformExpertParams,
        at: Option<BlockHash>,
    ) -> Result<bool>;

    #[rpc(name = "members_isModelExpert")]
    fn is_model_expert(
        &self,
        account: AccountId,
        query: QueryModelExpertParams,
        at: Option<BlockHash>,
    ) -> Result<bool>;

    #[rpc(name = "members_isModelCreator")]
    fn is_model_creator(
        &self,
        account: AccountId,
        query: QueryModelExpertParams,
        at: Option<BlockHash>,
    ) -> Result<bool>;

    #[rpc(name = "members_modelExperts")]
    fn model_experts(
        &self,
        query: QueryModelExpertParams,
        at: Option<BlockHash>,
    ) -> Result<Vec<AccountId>>;

    #[rpc(name = "members_modelCreator")]
    fn model_creator(
        &self,
        query: QueryModelExpertParams,
        at: Option<BlockHash>,
    ) -> Result<AccountId>;
}

/// A struct that implements the `MembersApi`.
pub struct Members<C, M> {
    // If you have more generics, no need to SumStorage<C, M, N, P, ...>
    // just use a tuple like SumStorage<C, (M, N, P, ...)>
    client: Arc<C>,
    _marker: std::marker::PhantomData<M>,
}

impl<C, M> Members<C, M> {
    /// Create new `Members` instance with the given reference to the client.
    pub fn new(client: Arc<C>) -> Self {
        Self {
            client,
            _marker: Default::default(),
        }
    }
}

/// Error type of this RPC api.
pub enum Error {
    /// The transaction was not decodable.
    DecodeError,
    /// The call to runtime failed.
    RuntimeError,
}

impl From<Error> for i64 {
    fn from(e: Error) -> i64 {
        match e {
            Error::RuntimeError => 1,
            Error::DecodeError => 2,
        }
    }
}

impl<C, Block> MembersApi<<Block as BlockT>::Hash, AccountId> for Members<C, Block>
where
    Block: BlockT,
    C: Send + Sync + 'static,
    C: ProvideRuntimeApi<Block>,
    C: HeaderBackend<Block>,
    C::Api: MembersRuntimeRpcApi<Block, AccountId>,
{
    fn is_platform_expert(
        &self,
        account: AccountId,
        query: QueryPlatformExpertParams,
        at: Option<<Block as BlockT>::Hash>,
    ) -> Result<bool> {
        let api = self.client.runtime_api();
        let at = BlockId::hash(at.unwrap_or_else(||
            // If the block hash is not supplied assume the best block.
            self.client.info().best_hash));

        let QueryPlatformExpertParams { app_id } = query;

        let runtime_api_result = api.is_platform_expert(&at, account, app_id);
        runtime_api_result.map_err(|e| RpcError {
            code: ErrorCode::ServerError(9876), // No real reason for this value
            message: "Something wrong".into(),
            data: Some(format!("{:?}", e).into()),
        })
    }

    fn is_model_expert(
        &self,
        account: AccountId,
        query: QueryModelExpertParams,
        at: Option<<Block as BlockT>::Hash>,
    ) -> Result<bool> {
        let api = self.client.runtime_api();
        let at = BlockId::hash(at.unwrap_or_else(||
            // If the block hash is not supplied assume the best block.
            self.client.info().best_hash));

        let QueryModelExpertParams { app_id, model_id } = query;

        let runtime_api_result = api.is_model_expert(&at, account, app_id, model_id.to_vec());
        runtime_api_result.map_err(|e| RpcError {
            code: ErrorCode::ServerError(9876), // No real reason for this value
            message: "Something wrong".into(),
            data: Some(format!("{:?}", e).into()),
        })
    }

    fn is_model_creator(
        &self,
        account: AccountId,
        query: QueryModelExpertParams,
        at: Option<<Block as BlockT>::Hash>,
    ) -> Result<bool> {
        let api = self.client.runtime_api();
        let at = BlockId::hash(at.unwrap_or_else(||
            // If the block hash is not supplied assume the best block.
            self.client.info().best_hash));

        let QueryModelExpertParams { app_id, model_id } = query;

        let runtime_api_result = api.is_model_creator(&at, account, app_id, model_id.to_vec());
        runtime_api_result.map_err(|e| RpcError {
            code: ErrorCode::ServerError(9876), // No real reason for this value
            message: "Something wrong".into(),
            data: Some(format!("{:?}", e).into()),
        })
    }

    fn model_experts(
        &self,
        query: QueryModelExpertParams,
        at: Option<<Block as BlockT>::Hash>,
    ) -> Result<Vec<AccountId>> {
        let api = self.client.runtime_api();
        let at = BlockId::hash(at.unwrap_or_else(||
            // If the block hash is not supplied assume the best block.
            self.client.info().best_hash));

        let QueryModelExpertParams { app_id, model_id } = query;

        let runtime_api_result = api.model_experts(&at, app_id, model_id.to_vec());
        runtime_api_result.map_err(|e| RpcError {
            code: ErrorCode::ServerError(9876), // No real reason for this value
            message: "Something wrong".into(),
            data: Some(format!("{:?}", e).into()),
        })
    }

    fn model_creator(
        &self,
        query: QueryModelExpertParams,
        at: Option<<Block as BlockT>::Hash>,
    ) -> Result<AccountId> {
        let api = self.client.runtime_api();
        let at = BlockId::hash(at.unwrap_or_else(||
            // If the block hash is not supplied assume the best block.
            self.client.info().best_hash));

        let QueryModelExpertParams { app_id, model_id } = query;

        let runtime_api_result = api.model_creator(&at, app_id, model_id.to_vec());
        runtime_api_result.map_err(|e| RpcError {
            code: ErrorCode::ServerError(9876), // No real reason for this value
            message: "Something wrong".into(),
            data: Some(format!("{:?}", e).into()),
        })
    }
}
