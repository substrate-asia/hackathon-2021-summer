//package com.tang.profile.photo;
//
//import android.app.Activity;
//import android.content.Context;
//import android.content.Intent;
//import android.graphics.Bitmap;
//import android.os.Bundle;
//import android.util.Log;
//import android.view.View;
//import android.view.View.OnClickListener;
//import android.view.ViewGroup;
//import android.widget.Button;
//import android.widget.ImageView;
//import android.widget.LinearLayout;
//import android.widget.TextView;
//
//import com.eva.android.DataLoadableActivity;
//import com.eva.android.widget.AsyncBitmapLoader;
//import com.eva.android.widget.AsyncBitmapLoader.ImageCallBack;
//import com.eva.android.widget.ImageViewActivity;
//import com.eva.android.widget.SimpleGridView;
//import com.eva.android.widget.SimpleGridView.DefaultElementDTO;
//import com.eva.android.widget.SimpleGridView.DefaultItemAction;
//import com.eva.android.widget.SimpleGridView.DefaultListAdapter;
//import com.eva.framework.dto.DataFromServer;
//import com.google.gson.Gson;
//import com.google.gson.reflect.TypeToken;
//import com.tang.AllEvaluateChainApplication;
//import com.tang.R;
////import com.x52im.rainbowchat.logic.chat_root.meta.Message.DownloadStatus;
//import com.tang.network.HttpRestHelper;
//import com.tang.util.ActivityRequestCode;
//import com.tang.util.IntentFactory;
////import com.tang.ActivityRequestCode;
////import com.tang.utils.IntentFactory;
//
//import java.io.File;
//import java.util.ArrayList;
//import java.util.Vector;
//
///**
// * “我的相册”Activity实现类.
// *
// * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
// * @since 2.5
// */
//public class PhotosViewActivity extends DataLoadableActivity
//{
//	private Button btnUpload = null;
//
//	/**
//     * 暂存从Intent中传过来的好友信息数据（将要用于界面展现）:本参数是必须的，表示查看/管
//     * 理的是谁的相册 */
//	private String photoOfUid = null;
//
//	/**
//     * 本参数是必须的，true表示是否有上传、删除等功能(通常是本地用户查看自已的相册时)，否则
//     * 表示仅用查看权限（而无法上传、删除等）通常用于查看别人的相册时 */
//	private boolean canMgr = false;
//
//	/** 布局：没有数据时的提示 */
//	private LinearLayout llNoAlarms = null;
//	/** 组件：照片列表 */
//	private SimpleGridView onlineGridView = null;
//
//	/** 发送照片包装实现对象 */
//	private UploadPhotoWrapper menuWindowForSendPic = null;
//
//	@Override
//	protected void onResume()
//	{
//		super.onResume();
//
//		// 如果有新相片上传成功，则要保证刷新界面数据，从而即时显示刚才上传的相片
//		if(AllEvaluateChainApplication.getsInstance().isNeedRefreshPhotoListForUpdate())
//			this.loadData();
//	}
//
//	@Override
//	protected void onDestroy()
//	{
//		// 百分百确保即时重置标识量，以便相片管理界面在onResume时不需要刷新数据（关
//		// 于相片上传成功后的数据刷新方式说明请参见MyApplication中对该标识量的注释）
//		AllEvaluateChainApplication.getsInstance()
//			.setNeedRefreshPhotoListForUpdate(false);
//		super.onDestroy();
//	}
//
//	@Override
//	public void finish()
//	{
//		//** 回调时把当前的最新相片数返回给上一层界面（如果本次已上传新相片则以便即时显示）
//		Bundle bundle = new Bundle();
//		// 当前相片数
//		bundle.putInt("__current_count_", onlineGridView.getGridViewAdapter().getListData().size());
//		Intent mIntent = new Intent();
//		mIntent.putExtras(bundle);
//		setResult(RESULT_OK, mIntent);
//		super.finish();
//	}
//
//	/**
//	 * {@inheritDoc}
//	 */
//	@Override
//	protected void initDataFromIntent()
//	{
//		// 解析从intent中传过来的数据：
//		ArrayList intentDatas = IntentFactory.parsePhotosViewActivityIntent(getIntent());
//		photoOfUid = (String)intentDatas.get(0);
//		canMgr = (Boolean)intentDatas.get(1);
//	}
//
//	/**
//	 * 本方法由父类的onCreate()调用，子类可在此方法中实现自已的UI显示逻辑。
//	 */
//	@Override
//	protected void initViews(Bundle savedInstanceState)
//	{
//		//设定自定义标题栏（设定此值即意味着开启自定义标题栏的使用，必须要在setContentView前设定）
//		customeTitleBarResId = R.id.main_more_profile_photo_gridview_list_titleBar;
//		//养成良好习惯：首先设置主layout，确保后绪的操作中使用到的组件都可以被find到
//		setContentView(R.layout.chain_main_more_profile_photo_gridview_list);
//
//		//**
//		btnUpload = (Button)findViewById(R.id.main_more_profile_photo_gridview_list_btnUpload);
//		//列表无数据时的UI提示信息组件
//		llNoAlarms = (LinearLayout)findViewById(R.id.main_more_profile_photo_gridview_list_noAlarmsLL);
//		//** views
////		onlineGridView = createGridViewObjForOnline(this, getOnlineGridViewListDatas(this));
//		// 为了重用SimpleGridView类，只能独立加载SimpleGridView了，不要忘了，不然ui上就看不见了！！
//		((ViewGroup)findViewById(R.id.main_more_profile_photo_gridview_list_contentLL)).addView(onlineGridView);
//		// 实例化发送图片包装实现类
//		menuWindowForSendPic = new UploadPhotoWrapper(this
//				, (ViewGroup)this.findViewById(R.id.main_more_profile_photo_gridview_list_rootLL)
//				, photoOfUid);
//
//		if(canMgr)
//		{
//			this.btnUpload.setVisibility(View.VISIBLE);
//			this.setTitle($$(R.string.main_more_profile_photo_viewforme));
//		}
//		else
//		{
//			this.btnUpload.setVisibility(View.GONE);
//			this.setTitle($$(R.string.main_more_profile_photo_viewforother));
//		}
//
//		// ui初始化完成后，强制刷新一下列表显示，以便当列表没有数据时可以即时显示空数据提示ui
//		onlineGridView.getGridViewAdapter().notifyDataSetChanged();
//	}
//
//	/**
//	 * 本方法由父类的onCreate()调用，子类可在此方法中为各UI功能组件增加事件临听。
//	 */
//	@Override
//	protected void initListeners()
//	{
//		btnUpload.setOnClickListener(new OnClickListener()
//		{
//			@Override
//			public void onClick(View v)
//			{
//				// 显示选择选项弹窗
//				menuWindowForSendPic.showChoice();
//			}
//		});
//	}
//
//	// 根据传进来的每页元素数据集，生成该页的GridView对象
//	private SimpleGridView createGridViewObjForOnline(Activity context, ArrayList<DefaultElementDTO> childListDatas)
//	{
//		return new SimpleGridView(context
//				, R.layout.chain_main_more_profile_photo_gridview, R.id.main_more_profile_photo_gridview_id
//				, R.layout.chain_main_more_profile_photo_gridview_item, R.id.main_more_profile_photo_gridview_item_textView, R.id.main_more_profile_photo_gridview_item_imageView
//				, childListDatas)
//		{
//			// 重写adapter创建方法，实现自定义的view展现逻辑
//			protected DefaultListAdapter createListAdapter(
//					Activity context, final int maingridviewitem_layout_res_id
//					, final int maingridviewitem_text_view_id, final int maingridviewitem_image_view_id
//					, ArrayList<DefaultElementDTO> listDatas)
//			{
//				DefaultListAdapter adapter = new ListAdapterImpl(context
//						, maingridviewitem_layout_res_id
//						, maingridviewitem_text_view_id
//						, maingridviewitem_image_view_id);
//				//
//				adapter.setListData(listDatas);
//				return adapter;
//			}
//		};
//	}
//
//	//------------------------------------------------------------------------------------------------
//	@Override
//	protected DataFromServer queryData(String... arg0)
//	{
//		return queryProfileResource(photoOfUid, 0);
//	}
//	@Override
//	protected void refreshToView(Object arg0)
//	{
//		if(arg0 != null)
//		{
////			Vector<Vector> ret = (Vector<Vector>)arg0;
//			Vector<Vector> ret = new Gson().fromJson(
//					(String)arg0, new TypeToken<Vector<Vector>>(){}.getType());
//
//			//## Bug FIX: 20170322 当删除的是最后一张照片完成时，如果判断“ret.size() > 0”才
//			//##          刷新列表显示数据则UI将不能及时更新显示内容为空哦。
////			if(ret.size() > 0)
//			{
//				// 要返回的所有元素列表
//				ArrayList<DefaultElementDTO> listDatas = new ArrayList<DefaultElementDTO>();
//
//				for(Vector row : ret)
//				{
//					IdentDTO cr = parseProfileResourceToIdentDTO(row, photoOfUid, 0);
//
//					// 加入该场景（到列表中）
//					listDatas.add(new DefaultElementDTO(createOnlineSenceAction(PhotosViewActivity.this, cr), "" , null));
//				}
//
//				// 更新gridview的列表数据并刷新ui显示
//				onlineGridView.getGridViewAdapter().setListData(listDatas);
//				onlineGridView.getGridViewAdapter().notifyDataSetChanged();
//			}
//
//			// 即时重置标识量，以便相片管理界面在onResume时不需要刷新数据（关
//			// 于相片上传成功后的数据刷新方式说明请参见MyApplication中对该标识量的注释）
//			AllEvaluateChainApplication.getsInstance()
//				.setNeedRefreshPhotoListForUpdate(false);
//		}
//		else
//		{
//			Log.w(PhotosViewActivity.class.getSimpleName(), "result==null!!");
//		}
//	}
//
//	/**
//	 * 将服务端返回的用户个人信息资源数据数据解析出来.
//	 *
//	 * @param row 一维Vector
//	 * @param resouceOfUid
//	 * @param resourceType 资源类型（参见数据库设计说明）：0 表示相片，1 表示个人介绍语音文件
//	 * @return
//	 */
//	public static IdentDTO parseProfileResourceToIdentDTO(Vector row, String resouceOfUid, int resourceType)
//	{
//		int j = 0;
//		String resource_id = (String)row.get(j++);
//		String res_file_name = (String)row.get(j++);
//		String res_human_size = (String)row.get(j++);
//		String res_size = (String)row.get(j++);
//		String view_count = (String)row.get(j++);
//		String create_time = (String)row.get(j++);
//
//		IdentDTO cr = new IdentDTO();
//		cr.setResource_id(resource_id);
//		cr.setUser_uid(resouceOfUid);
//		cr.setRes_type(String.valueOf(resourceType));
//		cr.setRes_file_name(res_file_name);
//		cr.setRes_human_size(res_human_size);
//		cr.setRes_size(res_size);
//		cr.setView_count(view_count);
//		cr.setCreate_time(create_time);
//
//		return cr;
//	}
//
//	/**
//	 * 查询用户个人信息资源数据.
//	 *
//	 * @param resourceOfUid
//	 * @param resourceType
//	 * @return
//	 */
//	public static DataFromServer queryProfileResource(String resourceOfUid, int resourceType)
//	{
//		return HttpRestHelper.queryPhotosOrVoicesListFromServer(resourceOfUid, resourceType);
//	}
//
//	/**
//	 * 处理回调.
//	 * {@inheritDoc}
//	 */
//	public void onActivityResult(int requestCode, int resultCode, Intent data)
//	{
//		// 注意：此处的requestCode不要跟其它类里的冲突哦！！！！
//		if(requestCode == ActivityRequestCode.TAKE_BIG_PICTURE
//				|| requestCode == ActivityRequestCode.CHOOSE_BIG_PICTURE2)
//		{
//			menuWindowForSendPic.onParantActivityResult(requestCode, resultCode, data);
//		}
//		else
//		{
//			//　TODO
//		}
//	}
//
//	private DefaultItemAction createOnlineSenceAction(final Context context, Object indentId)
//	{
//		return new DefaultItemAction(indentId)
//		{
//			@Override
//			public void actionPerformed(final Object indentId)
//			{
//				if(indentId != null && indentId instanceof IdentDTO)
//				{
//					final IdentDTO selectedCr = (IdentDTO)indentId;
//
//					// 图片消息时此字段存放的是图片的文件名
//					String imageFileName = (String)selectedCr.getRes_file_name();
//					// 查看照片原图
//					if(imageFileName != null)
//					{
//						File theCachedImageFile = new File(UploadPhotoHelper.getSendPhotoSavedDirHasSlash(context)+imageFileName);
//						// 如果本地没缓存就要启动网络加载模式哦
//						if(theCachedImageFile.exists())
//						{
//							((Activity)context).startActivity(IntentFactory.createViewPhotoActivityIntent(context
//									, ImageViewActivity.ImageDataType.FILE_PATH, theCachedImageFile.getAbsolutePath(), null
//									, canMgr, selectedCr.getResource_id(), selectedCr.getRes_file_name()));
//						}
//						else
//						{
//							((Activity)context).startActivity(IntentFactory.createViewPhotoActivityIntent(context
//									, ImageViewActivity.ImageDataType.URL
//									, UploadPhotoHelper.getPhotoDownloadURL(context, selectedCr.getRes_file_name())
//									, UploadPhotoHelper.getSendPhotoSavedDir(context)
//									, canMgr
//									, selectedCr.getResource_id()
//									, selectedCr.getRes_file_name()));
//						}
//					}
//				}
//			}
//		};
//	}
//
//
//	private class ListAdapterImpl extends DefaultListAdapter
//	{
//		// 缩略图缓存对象
//		private AsyncBitmapLoader asyncLoader = null;
//
//		public ListAdapterImpl(Activity context,
//				int maingridviewitem_layout_res_id,
//				int maingridviewitem_text_view_id,
//				int maingridviewitem_image_view_id)
//		{
//			super(context, maingridviewitem_layout_res_id, maingridviewitem_text_view_id,
//					maingridviewitem_image_view_id);
//
//			this.asyncLoader = new AsyncBitmapLoader(UploadPhotoHelper.getSendPhotoSavedDirHasSlash(context)
//					, ((int) (Runtime.getRuntime().maxMemory() / 1024)) / 16); // 默认以1/16可用内存作为最大图片缓存内存)
//		}
//
//		@Override
//		public View getView(final int position, View convertView, ViewGroup parent)
//		{
//			//列表item上的：
//			TextView viewText = null;
//			//列表item上的：
//			ImageView viewImage = null;
//			TextView viewCount = null;
//			TextView viewSize = null;
//
//			//---------------------------------------------------------------------------------------- （1）UI初始化
//			//当的item布局实例已经存在（不在存，意味着这个item刚好从不可见区移到可见区时）
//			//** 根据android的列表ui实现，为了节比资源占用，假如列表有100行而可见区显示5行，那么任何时候
//			//** 这个列表中只会有5个item的UI存在，其它的item都是当被转到可见区时自动把自
//			//** 已的数据实时地更新列UI上，以便查看，也就是说item的UI并不是与后台数据一
//			//** 一对应的，所以正如API文档里说的，convertView并不能确保它总能按你的想法保持不为null
//			boolean needCreateItem = (convertView == null);
//			//正在操作的列表行的数据集
//			final DefaultElementDTO rowData = listData.get(position);
//			final IdentDTO extraData = (IdentDTO)rowData.get__ident__();
//
//			if (needCreateItem)
//				//明细item的UI实例化
//				convertView = layoutInflater.inflate(itemResId, null);
//			//item里的操作组件实例
//			viewText = (TextView) convertView.findViewById(maingridviewitem_text_view_id);////R.id.chatting_list_view_bottom_waves_list_item_txt);
//			viewImage = (ImageView) convertView.findViewById(maingridviewitem_image_view_id);//R.id.chatting_list_view_bottom_waves_list_item_image);
//			viewCount = (TextView) convertView.findViewById(R.id.main_more_profile_photo_gridview_item_downloadCountView);
//			viewSize = (TextView) convertView.findViewById(R.id.main_more_profile_photo_gridview_item_fileSizeHumanView);
//
//			//---------------------------------------------------------------------------------------- （2）增加事件处理器
//			//各操作组件的事件监听器只需要在convertView被实例化时才需要重建（convertView需要被实例化
//			//当然就意味着它上面的所有操作组件都已经重新新建了）
//			//** 关于事件处理器的说明：事件处理器的增加其实可以不这么麻烦，直接每getView一次就给组件new一个处理器，
//			//** 这样做的好处是简单，但显然存在资源浪费（每刷新一次view就新建监听器）。而现在的实现就跟Android的列表
//			//** 实现原理一样，在切换到下一组item前，监听器永远只有一屏item的数量（刷新时只需要即时刷新对应item的数据到
//			//** 它的监听器里），这样就节省了资源开销！
//			if(needCreateItem)
//			{
//				//
//			}
//
//			//---------------------------------------------------------------------------------------- （3）
//			// ********** 设置文本数据
//			viewCount.setText(extraData.getView_count());
//			viewSize.setText(extraData.getRes_human_size());
//
//			// ********** 设置缩略图显示
//			//根据图片URL去查找内存缓存有没有对应的Bitmap对象，并传递回调方法，如果没有，则等下载完毕回调
//			Bitmap bitmap = asyncLoader.loadBitmap(viewImage
//					// 本地没有缓存的话尝试从网络读取（图片的缩略图，服务端存放的缩略图是原图文件名前带“th_”有前缀即查）
//					, UploadPhotoHelper.getPhotoDownloadURL(context, "th_"+extraData.getRes_file_name())
//					, "th_"+extraData.getRes_file_name() // 收到的图片，只需要显示缩略图即可，缩略图在服务端的格式是：“th_文件名”
//					, new ImageCallBack()
//					{
//						@Override
//						public void imageLoad(ImageView imageView, Bitmap bitmap)
//						{
//							imageView.setImageBitmap(bitmap);
//
//							// ## 非常奇怪的一个问题：当网络下载的图片完成时会回调至此，但图片数据明
//							// ## 明有了却不能刷新显示之，目前为了它能显示就低效地notifyDataSetChanged
//							// ## 一下吧，以后看看什么方法可以单独刷新（否则每一次都得刷新所有可见区），
//							// ## 有可能是android的listview机制性问题
//							ListAdapterImpl.this.notifyDataSetChanged();
//						}
//
//						@Override
//						public void imageLoadFaild(ImageView imageView)
//						{
//							imageView.setImageResource(R.drawable.common_default_img_no_border_fail_120dp_3x);
//						}
//					}
//					// 指定生成的Bitmap对象所描述的图片的大小(用于计算inSimpleSize,更小的尺寸将成倍地减小内存消耗)
//					, 245 , 245 // reqWidth和reqHeight大小（单位是像素）参考：main_more_profile_photo_gridview_item.xml中的main_more_profile_photo_gridview_item_imageViewLL
//			);
//			if(bitmap == null)
//				viewImage.setImageResource(R.drawable.common_default_img_no_border_120dp_3x);
//			else
//				viewImage.setImageBitmap(bitmap);
//
//			return convertView;
//		}
//
//		@Override
//		public void notifyDataSetChanged()
//		{
//			super.notifyDataSetChanged();
//			if(this.getCount() <= 0)
//			{
//				llNoAlarms.setVisibility(View.VISIBLE);
//				if(onlineGridView != null)
//					onlineGridView.setVisibility(View.GONE);
//			}
//			else
//			{
//				llNoAlarms.setVisibility(View.GONE);
//				if(onlineGridView != null)
//					onlineGridView.setVisibility(View.VISIBLE);
//			}
//		}
//	}
//
//	public static class IdentDTO
//	{
//        /** 资源id */
//        private String resource_id;
//        /** 上传者的uid */
//        private String user_uid;
//        /** 资源类型：“0”表示个人照片、“1”表示个人语音介绍 */
//        private String res_type;
//        /** 资源文件名 */
//        private String res_file_name;
//        /** 资源大小(人类可读) */
//        private String res_human_size;
//        /** 资源大小(单位:字节) */
//        private String res_size;
//        /** 被下载查看次数 */
//        private String view_count;
//        /** 上传时间 */
//        private String create_time;
//
//		/**
//		 * 辅助下载状态常量.
//		 * <p>
//		 * 此常量目前仅用于语音留言的声音文件下载时提示下载进度之用（当然以后也可用作它用）.
//		 */
////		private DownloadStatus downloadStatus = new DownloadStatus();
////
////		public DownloadStatus getDownloadStatus()
////		{
////			return downloadStatus;
////		}
//
//		public String getResource_id()
//		{
//			return resource_id;
//		}
//
//		public void setResource_id(String resource_id)
//		{
//			this.resource_id = resource_id;
//		}
//
//		public String getUser_uid()
//		{
//			return user_uid;
//		}
//
//		public void setUser_uid(String user_uid)
//		{
//			this.user_uid = user_uid;
//		}
//
//		public String getRes_type()
//		{
//			return res_type;
//		}
//
//		public void setRes_type(String res_type)
//		{
//			this.res_type = res_type;
//		}
//
//		public String getRes_file_name()
//		{
//			return res_file_name;
//		}
//
//		public void setRes_file_name(String res_file_name)
//		{
//			this.res_file_name = res_file_name;
//		}
//
//		public String getRes_human_size()
//		{
//			return res_human_size;
//		}
//
//		public void setRes_human_size(String res_human_size)
//		{
//			this.res_human_size = res_human_size;
//		}
//
//		public String getRes_size()
//		{
//			return res_size;
//		}
//
//		public void setRes_size(String res_size)
//		{
//			this.res_size = res_size;
//		}
//
//		public String getView_count()
//		{
//			return view_count;
//		}
//
//		public void setView_count(String view_count)
//		{
//			this.view_count = view_count;
//		}
//
//		public String getCreate_time()
//		{
//			return create_time;
//		}
//
//		public void setCreate_time(String create_time)
//		{
//			this.create_time = create_time;
//		}
//	}
//}
