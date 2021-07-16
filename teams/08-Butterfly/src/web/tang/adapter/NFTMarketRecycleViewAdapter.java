package com.tang.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.tang.EvaluatedRecycleViewAdapter;
import com.tang.R;
import com.tang.data_entity.FilmDataEvaluatedForUIEntity;
import com.tang.data_entity.NFTEvaluatedFilmCardEntity;

import java.util.List;

public class NFTMarketRecycleViewAdapter extends RecyclerView.Adapter<NFTMarketRecycleViewAdapter.NFTEvaluatedViewHolder>{

    List<NFTEvaluatedFilmCardEntity> mNFTFlimDatas;
    Context mContext;
    RecyclerView mRecyclerView;

    public NFTMarketRecycleViewAdapter(Context context, List<NFTEvaluatedFilmCardEntity>NFTfilmDatas) {
        super();
        mNFTFlimDatas = NFTfilmDatas;
        mContext = context;

    }

    @Override
    public NFTEvaluatedViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        Log.i("test", "onCreateViewHolder: test 1");
        return new NFTEvaluatedViewHolder(LayoutInflater.from(parent.getContext())
                .inflate(R.layout.chain_nft_evaluated_card_item, null, false));
    }



    @Override
    public void onBindViewHolder(NFTEvaluatedViewHolder holder, int position) {
        Log.i("test", "onCreateViewHolder: test 2");

        holder.FilmPicNFT.setImageBitmap(mNFTFlimDatas.get(position).getFilmPic());
        holder.PartInNumNFT.setText(mNFTFlimDatas.get(position).getPartInNum());
        holder.FilmNameNFT.setText(mNFTFlimDatas.get(position).getFilmName());
        holder.FilmScoreNFT.setText(mNFTFlimDatas.get(position).getScore());
        holder.HeiMaScoreNFT.setText(mNFTFlimDatas.get(position).getHeiMaScore());
        holder.OwnerAccointNFT.setText(mNFTFlimDatas.get(position).getOwner());
        holder.PriceNFT.setText(mNFTFlimDatas.get(position).getPrice());


    }

    @Override
    public int getItemCount() {
        Log.i("test", "onCreateViewHolder: test 3");
        return mNFTFlimDatas.size();

    }


    public void setRecyclerView(RecyclerView recyclerView){

        mRecyclerView=recyclerView;
    }





    class NFTEvaluatedViewHolder extends RecyclerView.ViewHolder {


        ImageView FilmPicNFT;
        TextView PartInNumNFT;

        TextView FilmNameNFT;
        TextView FilmScoreNFT;
        TextView HeiMaScoreNFT;
        TextView OwnerAccointNFT;
        TextView PriceNFT;


        NFTEvaluatedViewHolder(View view) {
            super(view);
            FilmPicNFT=(ImageView)view.findViewById(R.id.NFT_film_pic);
            PartInNumNFT=(TextView)view.findViewById(R.id.NFT_part_in_num);
            FilmNameNFT=(TextView)view.findViewById(R.id.NFT_film_name);

            FilmScoreNFT=(TextView)view.findViewById(R.id.NFT_film_score);
            HeiMaScoreNFT=(TextView)view.findViewById(R.id.NFT_heima_score);
            OwnerAccointNFT=(TextView)view.findViewById(R.id.owner_account_id);
            PriceNFT=(TextView)view.findViewById(R.id.NFT_price);
        }


    }
}
