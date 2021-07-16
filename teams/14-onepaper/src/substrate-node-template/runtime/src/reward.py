# Python Substrate Interface Library
#
# Copyright 2018-2020 Stichting Polkascan (Polkascan Foundation).
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
import sys
from substrateinterface import SubstrateInterface, Keypair
from substrateinterface.exceptions import SubstrateRequestException

# import logging
# logging.basicConfig(level=logging.DEBUG)

substrate = SubstrateInterface(
    url="ws://127.0.0.1:9944",
    ss58_format=42,
    type_registry_preset='substrate-node-template'
)
keypair = Keypair.create_from_uri('//Alice')

account_info = substrate.query('System', 'Account', params=[keypair.ss58_address])


print('Account info', account_info.value)

call = substrate.compose_call(
    call_module='PaperFile',
    call_function='reward',
    call_params={
        'value': 10000000000,
        "who": sys.argv[1]
    }
)
extrinsic = substrate.create_signed_extrinsic(
    call=call,
    keypair=keypair,
    era={'period': 64}
)


try:
    receipt = substrate.submit_extrinsic(extrinsic, wait_for_inclusion=True)

    print('Extrinsic "{}" included in block "{}"'.format(
        receipt.extrinsic_hash, receipt.block_hash
    ))

    if receipt.is_success:

        print('✅ Success, triggered events:')
        for event in receipt.triggered_events:
            print(f'* {event.value}')

    else:
        print('⚠️ Extrinsic Failed: ', receipt.error_message)


except SubstrateRequestException as e:
    print("Failed to send: {}".format(e))