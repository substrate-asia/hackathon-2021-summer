package com.tang.activity;

import android.content.Context;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;

import com.tang.EvaluatedRecycleViewAdapter;
import com.tang.R;
import com.tang.adapter.NFTMarketRecycleViewAdapter;
import com.tang.data_entity.FilmDataEvaluatedForUIEntity;
import com.tang.data_entity.NFTEvaluatedFilmCardEntity;

import java.util.ArrayList;
import java.util.List;

public class NFTMarketActivity extends ActivityRoot{



    public ArrayList<NFTEvaluatedFilmCardEntity> mNFTFilmDatas=new ArrayList<>();
    private Context mContext;
    private View view;
    private RecyclerView mNFTRecycleView;
    NFTMarketRecycleViewAdapter mRecyclerAdapt;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //如果有数据加载需要先加载数据
        getNFTFilmInfromDB();

        initViews();

    }

    private void initViews() {

        setContentView(R.layout.chain_nft_market_activity);

        initeRecyclerView();


    }

    public void initeRecyclerView( ){
        mNFTRecycleView=findViewById(R.id.NFT_Market_RecycleView);

        mNFTRecycleView.setLayoutManager(new GridLayoutManager(NFTMarketActivity.this,2));
        mRecyclerAdapt = new NFTMarketRecycleViewAdapter(NFTMarketActivity.this,mNFTFilmDatas);
        //  mRecyclerAdapt.getTeamInfActivity(this);
        mRecyclerAdapt.setRecyclerView(mNFTRecycleView);
        mNFTRecycleView.setAdapter(mRecyclerAdapt);


    }




    public void getNFTFilmInfromDB(){

        //定义一个测试数据

//        List<FilmDataPatInForUIEntity> testFilms=new  ArrayList<>();

        NFTEvaluatedFilmCardEntity NFTfilmDataEvaluatedEntity =new NFTEvaluatedFilmCardEntity();
        //电影Id先不设置。
        NFTfilmDataEvaluatedEntity.setFilmPic(BitmapFactory.decodeResource(getResources(), R.drawable.cat));
        NFTfilmDataEvaluatedEntity.setPartInNum("20000");
        NFTfilmDataEvaluatedEntity.setFilmName("加菲猫");
        NFTfilmDataEvaluatedEntity.setScore("6.5");
//        filmDataEvaluatedForUIEntity.setTotalBonus("50000");
        NFTfilmDataEvaluatedEntity.setHeiMaScore("1");
        NFTfilmDataEvaluatedEntity.setOwner("0xwrw323dfdfd");
        //owner也不用设置，直接用默认
        NFTfilmDataEvaluatedEntity.setPrice("0.1");

        NFTEvaluatedFilmCardEntity NFTfilmDataEvaluatedEntity1 =new NFTEvaluatedFilmCardEntity();
        NFTfilmDataEvaluatedEntity1.setFilmPic(BitmapFactory.decodeResource(getResources(), R.drawable.jtz));
        NFTfilmDataEvaluatedEntity1.setPartInNum("300000");
        NFTfilmDataEvaluatedEntity1.setFilmName("金刚大战哥斯拉");
        NFTfilmDataEvaluatedEntity1.setScore("8");
        NFTfilmDataEvaluatedEntity1.setHeiMaScore("4");
        NFTfilmDataEvaluatedEntity1.setOwner("0xwrw323dfdfd");
        NFTfilmDataEvaluatedEntity1.setPrice("0.2");

        NFTEvaluatedFilmCardEntity NFTfilmDataEvaluatedEntity2 =new NFTEvaluatedFilmCardEntity();
        NFTfilmDataEvaluatedEntity2.setFilmPic(BitmapFactory.decodeResource(getResources(), R.drawable.sdj));
        NFTfilmDataEvaluatedEntity2.setPartInNum("300000");
        NFTfilmDataEvaluatedEntity2.setFilmName("金刚大战哥斯拉");
        NFTfilmDataEvaluatedEntity2.setScore("8");
        NFTfilmDataEvaluatedEntity2.setHeiMaScore("4");
        NFTfilmDataEvaluatedEntity2.setOwner("0xwrw323dfdfd");
        NFTfilmDataEvaluatedEntity2.setPrice("0.3");


        mNFTFilmDatas.add(NFTfilmDataEvaluatedEntity);
        mNFTFilmDatas.add(NFTfilmDataEvaluatedEntity1);
        mNFTFilmDatas.add(NFTfilmDataEvaluatedEntity2);
//        mNFTFilmDatas.add(filmDataEvaluatedForUIEntity1);
//        mNFTFilmDatas.add(filmDataEvaluatedForUIEntity);


        //实际上这里需要从数据库读取数据！！！！！



    }


}
